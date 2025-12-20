import { useCvStore } from "@/stores/cv-store";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";

function PersonalDetailsForm() {
  const { personalDetails, updatePersonalDetails } = useCvStore();

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">Nome Completo</FieldLabel>
          <Input
            id="fullName"
            value={personalDetails.fullName}
            onChange={(e) =>
              updatePersonalDetails({
                ...personalDetails,
                fullName: e.target.value,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="personJobTitle">Seu cargo</FieldLabel>
          <Input
            id="personJobTitle"
            value={personalDetails.personJobTitle}
            onChange={(e) =>
              updatePersonalDetails({
                ...personalDetails,
                personJobTitle: e.target.value,
              })
            }
          />
        </Field>
        <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              value={personalDetails.email}
              onChange={(e) =>
                updatePersonalDetails({
                  ...personalDetails,
                  email: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Telefone</FieldLabel>
            <Input
              type="tel"
              id="phone"
              value={personalDetails.phone}
              onChange={(e) =>
                updatePersonalDetails({
                  ...personalDetails,
                  phone: e.target.value,
                })
              }
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="location">Localização</FieldLabel>
          <Input
            id="location"
            value={personalDetails.location}
            onChange={(e) =>
              updatePersonalDetails({
                ...personalDetails,
                location: e.target.value,
              })
            }
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default PersonalDetailsForm;
