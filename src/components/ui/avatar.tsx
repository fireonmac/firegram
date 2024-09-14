import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { displayNamePipe } from "@/services/auth/util";
import { Profile } from "@/types/auth/schema/model";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-2xl",
        ["2xl"]: "h-20 w-20 text-3xl",
        ["3xl"]: "h-24 w-24 text-4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
    VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface ProfileAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar> {
  profile: Profile;
}

/**
 * Show profile avatar if photoUrl exists, otherwise show displayName
 */
const ProfileAvatar = ({ className, profile, size }: ProfileAvatarProps) => (
  <Avatar className={className} size={size}>
    {profile.photoUrl ? (
      <AvatarImage src={profile.photoUrl} alt={profile.username} />
    ) : (
      <AvatarFallback>{displayNamePipe(profile)}</AvatarFallback>
    )}
  </Avatar>
);

export { Avatar, AvatarImage, AvatarFallback, ProfileAvatar };
