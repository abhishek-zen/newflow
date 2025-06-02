import { createServerSupabaseClient } from '@/utils/supabase/server'
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import Link from 'next/link'
import Tooltip from '@/components/ui/tooltip'

export default async function OnboardingPage() {
  const supabase = createServerSupabaseClient()
  const { data: steps, error } = await supabase
    .from('onboarding_steps')
    .select('id, title, description, order, preview_img')

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="heading-1 mb-6">Onboarding Tours</h1>
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-2">Manage Steps</h2>
          <Link href="/dashboard/onboarding/new" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition">+ Add Step</Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(steps) && steps.length > 0 ? (
              steps.map((step: any) => (
                <TableRow key={step.id}>
                  <TableCell>{step.order}</TableCell>
                  <TableCell>{step.title}</TableCell>
                  <TableCell>
                    <span className="block max-w-xs truncate">{step.description}</span>
                  </TableCell>
                  <TableCell>
                    {step.preview_img ? (
                      <img src={step.preview_img} alt="Tour Preview" className="w-16 h-16 object-cover rounded shadow" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/onboarding/${step.id}/edit`} className="text-accent font-medium mr-2 hover:underline">Edit</Link>
                    <button className="text-error hover:underline">Delete</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">No steps defined.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="card">
        <h2 className="heading-2 mb-3">Preview Tour</h2>
        <div className="flex gap-6 flex-wrap">
          {Array.isArray(steps) && steps.length > 0 ? (
            steps.map((step: any, idx: number) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <Tooltip content={step.description}>
                  <img
                    src={step.preview_img ?? 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&fit=crop&w=200&q=80'}
                    alt={step.title}
                    className="w-20 h-20 object-cover rounded shadow mb-2"
                  />
                </Tooltip>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))
          ) : (
            <span className="text-muted-foreground">No steps to preview.</span>
          )}
        </div>
      </div>
    </section>
  )
}
