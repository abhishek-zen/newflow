import { createServerSupabaseClient } from '@/utils/supabase/server'
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import Link from 'next/link'

export default async function PartnersPage() {
  const supabase = createServerSupabaseClient()
  const { data: partners, error } = await supabase
    .from('partners')
    .select('id, name, performance_score, certification_url')

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="heading-1 mb-6">Partner Enablement</h1>
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-2">Partners</h2>
          <Link href="/dashboard/partners/new" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition">+ Add Partner</Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Certification</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(partners) && partners.length > 0 ? (
              partners.map((partner: any) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>
                    <span className="text-success font-semibold">{partner.performance_score}</span>
                  </TableCell>
                  <TableCell>
                    {partner.certification_url ? (
                      <a href={partner.certification_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        View Certification
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/partners/${partner.id}/edit`} className="text-accent font-medium mr-2 hover:underline">Edit</Link>
                    <button className="text-error hover:underline">Delete</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">No partners found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="card">
        <h2 className="heading-2 mb-3">Partner Resources</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <a href="https://www.pexels.com/photo/business-people-shaking-hands-3183197/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Partner Certification Guide
            </a>
          </li>
          <li>
            <a href="https://www.pexels.com/photo/woman-in-white-shirt-holding-black-pen-1181533/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Performance Best Practices
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
