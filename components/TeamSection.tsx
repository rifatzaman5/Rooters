"use client"

import { cn } from "@/lib/utils"
import { urlFor } from "@/lib/sanity/image"
import type { TeamMember } from "@/types/sanity"

interface TeamSectionProps {
  members?: TeamMember[]
  className?: string
  heading?: string
  description?: string
}

export default function TeamSection({
  members,
  className,
  heading = "Meet Our Team",
  description = "Dedicated professionals committed to exceptional service.",
}: TeamSectionProps) {
  if (!members?.length) return null

  return (
    <section className={cn("relative py-16 sm:py-20 md:py-24 bg-background overflow-hidden", className)}>
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-border/50" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Team Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member._id}
              className="group flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="relative w-full aspect-square max-w-xs mb-5 overflow-hidden rounded-lg border border-border bg-muted">
                {member.image?.asset ? (
                  <img
                    src={urlFor(member.image).width(400).height(400).url()}
                    alt={member.image.alt || member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Photo
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-primary mb-3">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}