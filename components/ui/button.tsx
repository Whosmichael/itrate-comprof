import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Styles for links and buttons. Apply with buttonVariants() on an <a> or <button>.
export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2.5 rounded-md border border-transparent font-semibold whitespace-nowrap transition-[transform,background-color,border-color] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground hover:-translate-y-px',
        outline: 'border-border bg-surface text-foreground hover:border-accent',
        onAccent: 'bg-accent-foreground text-accent hover:-translate-y-px',
      },
      size: {
        default: 'h-11 px-4 text-sm',
        lg: 'h-12 px-5 text-[15px]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
