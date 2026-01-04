import { useCvStore } from "@/stores/cv-store";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";

function PersonalDetailsForm({ resumeId }: { resumeId: string }) {
  const { personalDetails, updatePersonalDetails } = useCvStore();
  const values = personalDetails[resumeId] ?? {
    personJobTitle: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  };

  return (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">Nome Completo</FieldLabel>
          <Input
            id="fullName"
            value={values.fullName}
            onChange={(e) =>
              updatePersonalDetails(resumeId, {
                fullName: e.target.value,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="personJobTitle">Seu cargo</FieldLabel>
          <Input
            id="personJobTitle"
            value={values.personJobTitle}
            onChange={(e) =>
              updatePersonalDetails(resumeId, {
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
              value={values.email}
              onChange={(e) =>
                updatePersonalDetails(resumeId, {
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
              value={values.phone}
              onChange={(e) =>
                updatePersonalDetails(resumeId, {
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
            value={values.location}
            onChange={(e) =>
              updatePersonalDetails(resumeId, {
                location: e.target.value,
              })
            }
          />
        </Field>
        <div className="grid lg:grid-cols-2 lg:gap-2 gap-4">
          <Field>
            <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
            <Input
              id="linkedin"
              value={values.linkedin}
              onChange={(e) =>
                updatePersonalDetails(resumeId, {
                  linkedin: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            <Input
              id="website"
              value={values.website}
              onChange={(e) =>
                updatePersonalDetails(resumeId, {
                  website: e.target.value,
                })
              }
            />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  );
}

export default PersonalDetailsForm;
