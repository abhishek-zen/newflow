import { createServerSupabaseClient } from '@/utils/supabase/server'
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import { Suspense } from 'react'
import Chart from '@/components/ui/chart'
import Link from 'next/link'

export default async function ExperimentsPage() {
  const supabase = createServerSupabaseClient()
  const { data: experiments, error } = await supabase
    .from('experiments')
    .select('id, name, status, created_at, updated_at, results')

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="heading-1 mb-6">Experiments</h1>
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="heading-2">Your Experiments</h2>
          <Link href="/dashboard/experiments/new" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition">+ New Experiment</Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(experiments) && experiments.length > 0 ? (
              experiments.map((exp: any) => (
                <TableRow key={exp.id}>
                  <TableCell>
                    <Link href={`/dashboard/experiments/${exp.id}`} className="hover:underline text-primary">{exp.name}</Link>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${exp.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {exp.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(exp.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(exp.updated_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/experiments/${exp.id}/edit`} className="text-accent font-medium mr-2 hover:underline">Edit</Link>
                    <button className="text-error hover:underline">Delete</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">No experiments found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="card">
        <h2 className="heading-2 mb-4">Experiment Results Overview</h2>
        <Suspense fallback={<div>Loading charts...</div>}>
          <Chart
            data={Array.isArray(experiments)
              ? experiments.map((exp: any) => ({
                  name: exp.name,
                  value: exp.results?.conversionRate ?? 0,
                }))
              : []
            }
            theme="light"
            type="bar"
            width={640}
            height={240}
            xKey="name"
            yKey="value"
          />
        </Suspense>
      </div>
    </section>
  )
}
