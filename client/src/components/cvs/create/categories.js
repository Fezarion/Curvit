/**
 * Simple object to determine each categories and subcategories' view.
 */

import SingleField from "./fields/SingleField";
import NameField from "./fields/NameField";
import ContactField from "./fields/ContactField";
import HistoryField from "./fields/HistoryField";
import SkillField from "./fields/SkillField";

export default [
    {
        key: "personal",
        label: "Personal",
        isEnabled: true,
        subCategories: [
            {
                key: "personal_name",
                label: "Name",
                isVisible: true,
                component: NameField,
                type: "text"
            },
            {
                key: "personal_cv",
                label: "CV Name",
                isVisible: true,
                component: SingleField,
                type: "text"
            },
            {
                key: "personal_city",
                label: "City",
                isVisible: true,
                component: SingleField,
                type: "text"
            },
            {
                key: "personal_country",
                label: "Country",
                isVisible: true,
                component: SingleField,
                type: "text"
            },
            {
                key: "personal_birthday",
                label: "Date Of Birth",
                isVisible: true,
                component: SingleField,
                type: "date"
            },
            {
                key: "personal_summary",
                label: "Personal Summary",
                isVisible: true,
                component: SingleField,
                type: "multi"
            },
            {
                key: "personal_title",
                label: "Personal Title",
                isVisible: true,
                component: SingleField,
                type: "text"
            }
        ]
    },
    {
        key: "contact",
        label: "Contact",
        isEnabled: false,
        subCategories: [
            {
                key: "contact_email",
                label: "Email",
                isVisible: false,
                component: ContactField,
                type: "email"
            },
            {
                key: "contact_phone",
                label: "Phone",
                isVisible: false,
                component: ContactField,
                type: "phone"
            },
            {
                key: "contact_reference",
                label: "Reference",
                isVisible: false,
                component: ContactField,
                type: "reference"
            }
        ]
    },
    {
        key: "history",
        label: "History",
        isEnabled: false,
        subCategories: [
            {
                key: "history_achievements",
                label: "Achievement",
                isVisible: false,
                component: HistoryField,
                type: "history"
            },
            {
                key: "history_certifications",
                label: "Certification",
                isVisible: false,
                component: HistoryField,
                type: "history"
            },
            {
                key: "history_education",
                label: "Education",
                isVisible: false,
                component: HistoryField,
                type: "history"
            },
            {
                key: "history_licenses",
                label: "License",
                isVisible: false,
                component: HistoryField,
                type: "history"
            },
            {
                key: "history_organizations",
                label: "Organization",
                isVisible: false,
                component: HistoryField,
                type: "history_with_title"
            },
            {
                key: "history_research",
                label: "Research",
                isVisible: false,
                component: HistoryField,
                type: "history_with_title"
            },
            {
                key: "history_projects",
                label: "Project",
                isVisible: false,
                component: HistoryField,
                type: "history_with_title"
            },
            {
                key: "history_work",
                label: "Company",
                isVisible: false,
                component: HistoryField,
                type: "history_with_title"
            },
            {
                key: "history_extras",
                label: "Extra",
                isVisible: false,
                component: HistoryField,
                type: "history_with_title"
            }
        ]
    },
    {
        key: "skill",
        label: "Skill",
        isEnabled: false,
        subCategories: [
            {
                key: "skill_skills",
                label: "Skill",
                isVisible: false,
                component: SkillField,
                type: "skills"
            },
            {
                key: "skill_languages",
                label: "Language",
                isVisible: false,
                component: SkillField,
                type: "languages"
            },
            {
                key: "skill_hobbies",
                label: "Hobby",
                isVisible: false,
                component: SkillField,
                type: "hobbies"
            }
        ]
    },
    {
        key: "extra",
        label: "Extra",
        isEnabled: false,
        subCategories: [
            {
                key: "extra_extras",
                label: "Extra",
                isVisible: false,
                component: ContactField,
                type: "multi"
            }
        ]
    }
];
