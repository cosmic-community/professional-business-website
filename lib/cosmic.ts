import { createBucketClient } from '@cosmicjs/sdk'
import { Service, TeamMember, Testimonial, CaseStudy, Order, CheckoutFormData, CartItem } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Service[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch services');
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch service: ${slug}`);
  }
}

// Fetch multiple services by IDs
export async function getServicesByIds(ids: string[]): Promise<Service[]> {
  try {
    const promises = ids.map(id => 
      cosmic.objects
        .findOne({ type: 'services', id })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
        .catch(() => null)
    );
    
    const results = await Promise.all(promises);
    return results.filter(Boolean) as Service[];
  } catch (error) {
    throw new Error('Failed to fetch services by IDs');
  }
}

// Fetch all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as TeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch team members');
  }
}

// Fetch single team member by slug
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'team-members', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as TeamMember;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch team member: ${slug}`);
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Fetch all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as CaseStudy[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch case studies');
  }
}

// Fetch single case study by slug
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as CaseStudy;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch case study: ${slug}`);
  }
}

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

// Create new order
export async function createOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[]
): Promise<Order> {
  try {
    const orderNumber = generateOrderNumber();
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.service.metadata?.price_amount || 0;
      return sum + (price * item.quantity);
    }, 0);

    const orderData = {
      title: `Order ${orderNumber}`,
      type: 'orders',
      status: 'published',
      metadata: {
        order_number: orderNumber,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        services: cartItems.map(item => ({
          service_id: item.service.id,
          service_name: item.service.metadata?.service_name || item.service.title,
          quantity: item.quantity,
          price: item.service.metadata?.price_amount || 0,
          notes: item.notes || ''
        })),
        total_amount: totalAmount,
        order_status: 'Pending',
        payment_status: 'Pending',
        order_date: new Date().toISOString().split('T')[0],
        notes: formData.notes,
        billing_address: formData.billing_address,
        preferred_contact_method: formData.preferred_contact_method,
        project_timeline: formData.project_timeline
      }
    };

    const response = await cosmic.objects.insertOne(orderData);
    return response.object as Order;
  } catch (error) {
    throw new Error('Failed to create order');
  }
}

// Fetch order by order number
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'orders', 'metadata.order_number': orderNumber })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects[0] as Order || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch order: ${orderNumber}`);
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  orderStatus: string,
  paymentStatus?: string
): Promise<Order> {
  try {
    const updateData: any = {
      metadata: {
        order_status: orderStatus
      }
    };

    if (paymentStatus) {
      updateData.metadata.payment_status = paymentStatus;
    }

    const response = await cosmic.objects.updateOne(orderId, updateData);
    return response.object as Order;
  } catch (error) {
    throw new Error('Failed to update order status');
  }
}