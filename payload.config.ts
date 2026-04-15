import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users";
import { Speakers } from "./src/collections/Speakers";
import { Sponsors } from "./src/collections/Sponsors";
import { Registrations } from "./src/collections/Registrations";
import { Payments } from "./src/collections/Payments";
import { ConferenceDays } from "./src/collections/ConferenceDays";
import { Sessions } from "./src/collections/Sessions";
import { ContentBlocks } from "./src/collections/ContentBlocks";
import { SiteConfig } from "./src/collections/SiteConfig";
import { SpeakerApplications } from "./src/collections/SpeakerApplications";
import { ContactSubmissions } from "./src/collections/ContactSubmissions";
import { PreviousConferences } from "./src/collections/PreviousConferences";
import { Media } from "./src/collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — ABA 2026 Admin",
    },
  },
  collections: [
    Users,
    Registrations,
    Payments,
    Speakers,
    Sponsors,
    ConferenceDays,
    Sessions,
    ContentBlocks,
    SiteConfig,
    SpeakerApplications,
    ContactSubmissions,
    PreviousConferences,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || process.env.JWT_SECRET || "aba-maldives-payload-secret",
  db: postgresAdapter({
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
