import React, { useState, useMemo } from "react";
import { CERTIFICATES } from "../../constants";
import type { Certificate } from "../types";
import { ExternalLinkIcon, CertificateIcon } from "./Icons";

const CertificateCard: React.FC<{ certificate: Certificate }> = ({
  certificate,
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-none overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-[1.02] group flex items-center p-6 gap-6 h-full">
      <div className="flex-shrink-0">
        <img
          src={certificate.imageUrl}
          alt={`${certificate.organization} logo`}
          className="w-20 h-20 object-contain rounded-md bg-slate-700 p-1"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
          {certificate.name}
        </h3>
        <p className="text-slate-400 font-medium">{certificate.organization}</p>
        <p className="text-slate-500 text-sm mb-3">{certificate.date}</p>
        <a
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
          Show Credential <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

type SortOrder = "date-desc" | "date-asc" | "alpha-asc";

const SORT_OPTIONS: { key: SortOrder; label: string }[] = [
  { key: "date-desc", label: "Newest First" },
  { key: "date-asc", label: "Oldest First" },
  { key: "alpha-asc", label: "A-Z" },
];

const Certificates: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("date-desc");

  const organizations = useMemo(() => {
    const orgs = new Set(CERTIFICATES.map((cert) => cert.organization));
    return ["All", ...Array.from(orgs)];
  }, []);

  const displayedCertificates = useMemo(() => {
    // Helper function to parse date strings like "Issued Jan 2024"
    const parseDate = (dateString: string): Date => {
      const parts = dateString.replace("Issued ", "").split(" "); // ["Jan", "2024"]
      return new Date(`${parts[0]} 1, ${parts[1]}`);
    };

    const filtered =
      activeFilter === "All"
        ? CERTIFICATES
        : CERTIFICATES.filter((cert) => cert.organization === activeFilter);

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "date-asc":
          return parseDate(a.date).getTime() - parseDate(b.date).getTime();
        case "alpha-asc":
          return a.name.localeCompare(b.name);
        case "date-desc":
        default:
          return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      }
    });

    return sorted;
  }, [activeFilter, sortOrder]);

  return (
    <section id="certificates" className="py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <CertificateIcon className="w-8 h-8" />
          Licenses & Certifications
        </h2>
      </div>

      <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Filter Controls */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Filter by Organization
          </h3>
          <div className="flex justify-center flex-wrap gap-2">
            {organizations.map((org) => (
              <button
                key={org}
                onClick={() => setActiveFilter(org)}
                aria-pressed={activeFilter === org}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${
                  activeFilter === org
                    ? "bg-cyan-500 text-white shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {org}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Sort by
          </h3>
          <div className="flex justify-center flex-wrap gap-2">
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortOrder(key)}
                aria-pressed={sortOrder === key}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${
                  sortOrder === key
                    ? "bg-cyan-500 text-white shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedCertificates.map((cert) => (
          <CertificateCard key={cert.credentialUrl} certificate={cert} />
        ))}
      </div>
    </section>
  );
};

export default Certificates;
