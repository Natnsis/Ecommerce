import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: "✅ Server running with TypeScript + Prisma!" });
});

// GET /users
app.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ include: { posts: true } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
