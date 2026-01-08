import { useCvStore } from "@/stores/cvStore";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { useTranslation } from "react-i18next";
import { CVLanguageSelector } from "@/components/CvLanguageSelector";
import { useCvLanguage } from "@/hooks/useCvLanguage";

function PersonalDetailsForm({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const { personalDetails, updatePersonalDetails } = useCvStore();
  const { language, setLanguage } = useCvLanguage(resumeId);
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
        <div className="mb-4 pb-4 border-b">
          <CVLanguageSelector value={language} onChange={setLanguage} />
        </div>
        <Field>
          <FieldLabel htmlFor="fullName">{t("resume.fields.fullName")}</FieldLabel>
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
          <FieldLabel htmlFor="personJobTitle">{t("resume.fields.jobTitle")}</FieldLabel>
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
            <FieldLabel htmlFor="email">{t("resume.fields.email")}</FieldLabel>
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
            <FieldLabel htmlFor="phone">{t("resume.fields.phone")}</FieldLabel>
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
          <FieldLabel htmlFor="location">{t("resume.fields.location")}</FieldLabel>
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
            <FieldLabel htmlFor="linkedin">{t("resume.fields.linkedin")}</FieldLabel>
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
            <FieldLabel htmlFor="website">{t("resume.fields.website")}</FieldLabel>
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
