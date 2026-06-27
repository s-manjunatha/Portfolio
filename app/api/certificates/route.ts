import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const certPath = path.join(process.cwd(), "public", "certificates");
    const imgCertPath = path.join(process.cwd(), "public", "images", "certificates");

    // Ensure directories exist
    if (!fs.existsSync(certPath)) {
      fs.mkdirSync(certPath, { recursive: true });
    }
    if (!fs.existsSync(imgCertPath)) {
      fs.mkdirSync(imgCertPath, { recursive: true });
    }

    // Copy artifacts certificates to public/certificates/ if they exist and are not already copied
    const artifactsDir = "C:\\Users\\S MANJUNATH\\.gemini\\antigravity\\brain\\3a155920-7a11-420c-98b2-1777486e2bbb";
    const filesToCopy = [
      { src: "media__1782568866085.jpg", dest: "IBM-SkillsBuild_Python-101-for-Data-Science_2026-04-21.jpg" },
      { src: "media__1782568866086.jpg", dest: "IBM-SkillsBuild_Data-Visualization-with-Python_2026-05-28.jpg" },
      { src: "media__1782568866146.jpg", dest: "IBM-SkillsBuild_Introduction-to-Data-Science_2026-06-10.jpg" }
    ];

    for (const item of filesToCopy) {
      const srcPath = path.join(artifactsDir, item.src);
      const destPath1 = path.join(certPath, item.dest);
      const destPath2 = path.join(imgCertPath, item.dest);
      
      // Copy to public/certificates
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath1)) {
        try {
          fs.copyFileSync(srcPath, destPath1);
        } catch (err) {
          console.error(`Failed to copy to certificates: ${item.src}`, err);
        }
      }
      
      // Copy to public/images/certificates
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath2)) {
        try {
          fs.copyFileSync(srcPath, destPath2);
        } catch (err) {
          console.error(`Failed to copy to images/certificates: ${item.src}`, err);
        }
      }
    }

    // Read files from public/certificates/
    const certFiles = fs.existsSync(certPath)
      ? fs.readdirSync(certPath).filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      : [];

    // Read files from public/images/certificates/
    const imgCertFiles = fs.existsSync(imgCertPath)
      ? fs.readdirSync(imgCertPath).filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      : [];

    // Combine lists, making sure we don't duplicate filenames
    const uniqueFiles = new Map<string, { file: string; url: string }>();

    certFiles.forEach((file) => {
      uniqueFiles.set(file, { file, url: `/certificates/${file}` });
    });

    imgCertFiles.forEach((file) => {
      if (!uniqueFiles.has(file)) {
        uniqueFiles.set(file, { file, url: `/images/certificates/${file}` });
      }
    });

    const allFiles = Array.from(uniqueFiles.values());

    if (allFiles.length === 0) {
      return NextResponse.json({ uploaded: false, certificates: [] });
    }

    // Map files to certificate objects
    const certificates = allFiles.map((item, index) => {
      const nameWithoutExt = path.parse(item.file).name;
      const parts = nameWithoutExt.split("_");

      let issuer = "IBM SkillsBuild";
      let title = nameWithoutExt.replace(/[-_]/g, " ");
      let date = "2026";

      if (parts.length >= 3) {
        issuer = parts[0].replace(/-/g, " ");
        title = parts[1].replace(/-/g, " ");
        const dateStr = parts[2];
        try {
          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
          } else {
            date = dateStr;
          }
        } catch (e) {
          date = dateStr;
        }
      } else if (parts.length === 2) {
        issuer = parts[0].replace(/-/g, " ");
        title = parts[1].replace(/-/g, " ");
      }

      return {
        id: `cert-${index}`,
        title,
        issuer,
        issueDate: date,
        imageUrl: item.url,
      };
    });

    return NextResponse.json({ uploaded: true, certificates });
  } catch (error) {
    console.error("Error reading certificates directory:", error);
    return NextResponse.json({ uploaded: false, certificates: [] });
  }
}
