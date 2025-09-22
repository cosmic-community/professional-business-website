'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Order } from '@/types'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber)
    } else {
      setLoading(false)
    }
  }, [orderNumber])

  const fetchOrder = async (orderNum: string) => {
    try {
      const response = await fetch(`/api/orders/${orderNum}`)
      if (response.ok) {
        const { order } = await response.json()
        setOrder(order)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderNumber || !order) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Order Not Found</h1>
          <p className="text-secondary-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-green-500 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Order Submitted Successfully!</h1>
          <p className="text-xl text-secondary-600">Thank you for choosing our services</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
            <h2 className="text-lg font-bold text-primary-800">Order Details</h2>
            <p className="text-primary-600">Order #{order.metadata?.order_number}</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-3">Contact Information</h3>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Name:</span>
                    <p className="text-secondary-900">{order.metadata?.customer_name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Email:</span>
                    <p className="text-secondary-900">{order.metadata?.customer_email}</p>
                  </div>
                  {order.metadata?.customer_phone && (
                    <div>
                      <span className="text-sm font-medium text-secondary-700">Phone:</span>
                      <p className="text-secondary-900">{order.metadata.customer_phone}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Preferred Contact:</span>
                    <p className="text-secondary-900">{order.metadata?.preferred_contact_method}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-3">Services Ordered</h3>
              <div className="space-y-3">
                {order.metadata?.services && Array.isArray(order.metadata.services) && order.metadata.services.map((service: any, index: number) => (
                  <div key={index} className="bg-secondary-50 p-4 rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-secondary-900">{service.service_name}</h4>
                      <p className="text-sm text-secondary-600">Quantity: {service.quantity}</p>
                      {service.notes && (
                        <p className="text-sm text-secondary-600 mt-1">Notes: {service.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-secondary-900">
                        ${(service.price * service.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-secondary-600">${service.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-3">Project Details</h3>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Timeline:</span>
                    <p className="text-secondary-900">{order.metadata?.project_timeline}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Order Date:</span>
                    <p className="text-secondary-900">{order.metadata?.order_date}</p>
                  </div>
                </div>
                {order.metadata?.notes && (
                  <div>
                    <span className="text-sm font-medium text-secondary-700">Project Notes:</span>
                    <p className="text-secondary-900 mt-1">{order.metadata.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-secondary-900">Total Amount:</span>
                <span className="text-primary-600">${order.metadata?.total_amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              You'll receive a confirmation email shortly
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Our team will review your requirements and contact you within 24 hours
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              We'll schedule a consultation to discuss your project in detail
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Payment details and project timeline will be finalized during consultation
            </li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mr-4"
          >
            Return Home
          </Link>
          <Link
            href="/#services"
            className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse More Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}