// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service interface
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name?: string;
    description?: string;
    short_description?: string;
    service_icon?: {
      url: string;
      imgix_url: string;
    };
    service_category?: 'Consulting' | 'Development' | 'Marketing' | 'Design' | 'Other';
    pricing_type?: 'Fixed Price' | 'Hourly Rate' | 'Monthly Subscription' | 'Custom Quote';
    price_amount?: number;
    starting_price?: string;
    duration?: string;
    features?: string[];
    included_deliverables?: string[];
    is_orderable?: boolean;
    requires_consultation?: boolean;
    minimum_quantity?: number;
    maximum_quantity?: number;
  };
}

// Team Member interface
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name?: string;
    job_title?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    linkedin_url?: string;
    years_experience?: number;
    skills?: string[];
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    company?: string;
    position?: string;
    testimonial?: string;
    rating?: {
      key: string;
      value: string;
    };
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    project_type?: string;
  };
}

// Case Study interface
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_title?: string;
    client_name?: string;
    industry?: string;
    challenge?: string;
    solution?: string;
    results?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    project_duration?: string;
    technologies?: string[];
    related_service?: Service;
  };
}

// Order service item interface
export interface OrderServiceItem {
  service_id: string;
  service_name: string;
  quantity: number;
  price: number;
  notes?: string;
}

// Order interface
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    services?: OrderServiceItem[];
    total_amount?: number;
    order_status?: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
    payment_status?: 'Pending' | 'Paid' | 'Partial' | 'Refunded';
    order_date?: string;
    notes?: string;
    billing_address?: {
      street?: string;
      city?: string;
      state?: string;
      zip_code?: string;
      country?: string;
    };
    preferred_contact_method?: 'Email' | 'Phone' | 'Both';
    project_timeline?: 'As Soon As Possible' | 'Within 1 Month' | 'Within 3 Months' | 'Within 6 Months' | 'Flexible';
  };
}

// Cart item interface
export interface CartItem {
  service: Service;
  quantity: number;
  notes?: string;
}

// Cart state interface
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Checkout form data interface
export interface CheckoutFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  preferred_contact_method: 'Email' | 'Phone' | 'Both';
  project_timeline: 'As Soon As Possible' | 'Within 1 Month' | 'Within 3 Months' | 'Within 6 Months' | 'Flexible';
  notes: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}