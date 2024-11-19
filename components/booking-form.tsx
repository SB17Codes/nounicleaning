'use client'

import { useState, useEffect } from "react"
import { getProperty, createCleaningSchedule } from "@/db/fauna"
import { useParams } from "next/navigation"
import { useActionState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Property {
  propertyId: string
  propertyType: string
  address: string
}

export function BookingFormComponent() {
  const { userid } = useParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<string>("")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyList = await getProperty(userid)
        setProperties(Array.isArray(propertyList) ? propertyList : [])
        if (propertyList?.length > 0) {
          setSelectedProperty(propertyList[0].propertyId)
        }
      } catch (error) {
        console.error("Error fetching properties:", error)
      }
    }

    fetchProperties()
  }, [userid])

  async function handleSubmit(previousState: any, formData: FormData) {
    try {
      const property = properties.find(p => p.propertyId === selectedProperty)
      if (!property) throw new Error("No property selected")
  
      const scheduledDate = formData.get('scheduledDate')?.toString()
      const time = formData.get('time')?.toString()
      const notes = formData.get('notes')?.toString() || ''
      
      if (!scheduledDate || !time) {
        throw new Error("Date and time are required")
      }
  
      const [hours, minutes] = time.split(':')
      const dateObj = new Date(scheduledDate)
      dateObj.setHours(parseInt(hours), parseInt(minutes))

      const cleaningData = {
        propertyId: property.propertyId,
        scheduledTime: dateObj.toISOString(),
        notes: notes
      }
      
      console.log('Submitting cleaning schedule:', cleaningData)
  
      const result = await createCleaningSchedule(cleaningData)
      
      if (!result) {
        throw new Error("Failed to create cleaning schedule")
      }
  
      return { success: true }
  
    } catch (error) {
      console.error("Failed to create cleaning schedule:", error)
      return { error: error.message }
    }
  }

  const [state, submitAction, isPending] = useActionState(handleSubmit, null)

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book a Cleaning</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={submitAction} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="propertyId">Property</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger id="propertyId">
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.propertyId} value={property.propertyId}>
                        {property.propertyType} - {property.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  type="date"
                  id="scheduledDate"
                  name="scheduledDate"
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Any special instructions or requests?"
                />
              </div>
            </div>
            {state?.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedProperty || isPending}
            >
              {isPending ? "Submitting..." : "Book Cleaning"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}