import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = contactSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: validatedFields.error.errors.map((e) => e.message).join(', '),
          status: 'error',
        },
        { status: 400 }
      );
    }

    console.log('Form data submitted:', validatedFields.data);

    return NextResponse.json(
      {
        message: 'Thank you for your message! I will get back to you soon.',
        status: 'success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        {
          message: 'Something went wrong.',
          status: 'error',
        },
        { status: 500 }
      );
  }
}
