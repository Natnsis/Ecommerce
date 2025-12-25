const books = [
  { id: 1, img: "/books/book1.jpg" },
  { id: 2, img: "/books/book2.jpg" },
  { id: 3, img: "/books/book3.jpg" },
  { id: 4, img: "/books/book4.jpg" },
  { id: 5, img: "/books/book5.jpg" },
  { id: 6, img: "/books/book6.jpg" },
  { id: 7, img: "/books/book7.jpg" },
  { id: 8, img: "/books/book8.jpg" },
  { id: 9, img: "/books/book9.jpg" },
  { id: 10, img: "/books/book10.jpg" },
  { id: 11, img: "/books/book11.jpg" },
  { id: 12, img: "/books/book12.jpg" },
]

const CustomerBooks = () => {
  return (
    <div className="mt-5 px-5">
      <div className="border rounded-lg p-5">
        <h1 className="font-secondary-bold text-xl">Best Sold Books</h1>
        <div className="mt-5 flex gap-5 overflow-x-auto w-full pb-5">
          {books.map((b) => (
            <div key={b.id} className="flex-shrink-0">
              <img
                src={b.img}
                className="h-64 w-52 object-cover bg-black"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default CustomerBooks
