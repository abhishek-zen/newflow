import { createServerSupabaseClient } from './server'
import { NextRequest, NextResponse } from 'next/server'

export async function updateSession(req: NextRequest, res: NextResponse) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  // HIPAA compliance: ensure session contains required claims
  if (session) {
    const { user } = session
    // Example compliance check: Require 'hipaa_compliant' custom claim or metadata
    if (
      !user.user_metadata ||
      user.user_metadata.hipaa_compliant !== true
    ) {
      // End session or redirect to compliance page
      return NextResponse.redirect('/compliance-required')
    }
    // Multi-tenant: check organization id in metadata
    if (!user.user_metadata.org_id) {
      return NextResponse.redirect('/choose-organization')
    }
  }
  // Pass through if compliant
  return NextResponse.next()
}
