import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectPersonalUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  )
}