import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
      <ModalProvider />
    </ClerkProvider>
  );
};

export default PlatformLayout;