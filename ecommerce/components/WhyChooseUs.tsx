"use client"
import { Card, CardContent } from '@/components/ui/card';
import { HandshakeIcon, SpinnerBallIcon, CalendarCheckIcon } from '@phosphor-icons/react';

const WhyChooseUs = () => {
  return (
    <section className="h-full">
      <h1 className="text-center text-4xl mb-10">Why Choose Us</h1>
      <div className="flex flex-col justify-center gap-10 px-20 md:flex-row md:gap-12 md:px-20">
        <Card>
          <CardContent>
            <div className='flex justify-center p-10 rounded-full'>
              <HandshakeIcon size={70} color='#E7000A' />
            </div>
            <div>
              <h1 className='text-center text-2xl mb-5'>100% Return</h1>
              <p className='text-center px-10'>
                A finantial institution that accepts
                deposits from the public and creates a demand deposit
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className='flex justify-center p-10 rounded-full'>
              <SpinnerBallIcon size={70} color='#E7000A' />
            </div>
            <div>
              <h1 className='text-center text-2xl mb-5'>On Time Delivery</h1>
              <p className='text-center px-10'>
                A finantial institution that accepts
                deposits from the public and creates a demand deposit
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className='flex justify-center p-10 rounded-full'>
              <CalendarCheckIcon size={70} color='#E7000A' />
            </div>
            <div>
              <h1 className='text-center text-2xl mb-5'>24x7 Support</h1>
              <p className='text-center px-10'>
                A finantial institution that accepts
                deposits from the public and creates a demand deposit
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default WhyChooseUs
