import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/cosmic'
import { CheckoutFormData, CartItem } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, cartItems }: { formData: CheckoutFormData; cartItems: CartItem[] } = body

    // Validate required fields
    if (!formData.customer_name || !formData.customer_email || !cartItems.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create order in Cosmic
    const order = await createOrder(formData, cartItems)

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}