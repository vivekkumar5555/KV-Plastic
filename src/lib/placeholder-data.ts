export const stats = [
  { value: "25+", label: "Years in Operation" },
  { value: "180+", label: "Clients Served" },
  { value: "12M+", label: "Products Delivered" },
  { value: "ISO 9001", label: "Certified" },
];

export const capabilities = [
  {
    title: "Injection Molding",
    description: "High-volume precision molding for consumer and industrial parts.",
    href: "/products?process=injection-molding",
  },
  {
    title: "Custom Tooling",
    description: "In-house mold design and fabrication for new product runs.",
    href: "/products?process=custom-tooling",
  },
  {
    title: "Blow Molding",
    description: "Hollow plastic components — containers, ducting, and housings.",
    href: "/products?process=blow-molding",
  },
  {
    title: "Extrusion",
    description: "Continuous profiles, tubing, and sheet stock to spec.",
    href: "/products?process=extrusion",
  },
  {
    title: "Assembly & Finishing",
    description: "Ultrasonic welding, printing, and secondary finishing services.",
    href: "/products?process=assembly-finishing",
  },
  {
    title: "Material Selection",
    description: "ABS, PP, HDPE, PC, and engineered resin guidance by application.",
    href: "/products?process=material-selection",
  },
];

export const products = [
  {
    slug: "industrial-storage-crate",
    name: "Industrial Storage Crate",
    category: "Industrial",
    material: "HDPE",
    shortSpec: "Stackable, 50kg load rating",
    featured: true,
    description:
      "A stackable industrial storage crate engineered for repeated heavy-duty warehouse use, with reinforced ribbing for load stability.",
    tolerance: "±0.15mm",
    weight: "1.8 kg",
    dimensions: "600 × 400 × 300 mm",
    moq: "500 units",
  },
  {
    slug: "precision-gear-housing",
    name: "Precision Gear Housing",
    category: "OEM Components",
    material: "ABS",
    shortSpec: "±0.05mm tolerance",
    featured: true,
    description:
      "A tight-tolerance gear housing for OEM drivetrain assemblies, produced with 100% dimensional inspection on every run.",
    tolerance: "±0.05mm",
    weight: "220 g",
    dimensions: "120 × 85 × 60 mm",
    moq: "1,000 units",
  },
  {
    slug: "consumer-cable-organizer",
    name: "Consumer Cable Organizer",
    category: "Consumer",
    material: "PP",
    shortSpec: "Snap-fit, 4 color options",
    featured: true,
    description:
      "A snap-fit cable organizer for retail and e-commerce, available in four standard colors with custom color matching on request.",
    tolerance: "±0.20mm",
    weight: "45 g",
    dimensions: "90 × 40 × 25 mm",
    moq: "2,500 units",
  },
  {
    slug: "automotive-duct-connector",
    name: "Automotive Duct Connector",
    category: "Automotive",
    material: "PC",
    shortSpec: "Heat resistant to 120°C",
    featured: false,
    description:
      "A heat-resistant duct connector rated for continuous under-hood exposure, validated against automotive thermal cycling standards.",
    tolerance: "±0.10mm",
    weight: "95 g",
    dimensions: "150 × 60 × 60 mm",
    moq: "1,500 units",
  },
  {
    slug: "medical-device-enclosure",
    name: "Medical Device Enclosure",
    category: "Medical",
    material: "Polycarbonate",
    shortSpec: "IP54 rated, sterilizable",
    featured: false,
    description:
      "An IP54-rated enclosure for portable medical devices, molded from a sterilizable polycarbonate grade suitable for clinical environments.",
    tolerance: "±0.08mm",
    weight: "310 g",
    dimensions: "200 × 120 × 80 mm",
    moq: "1,000 units",
  },
  {
    slug: "agricultural-tank-fitting",
    name: "Agricultural Tank Fitting",
    category: "Agriculture",
    material: "HDPE",
    shortSpec: "UV stabilized",
    featured: false,
    description:
      "A UV-stabilized tank fitting built for prolonged outdoor exposure on agricultural spray and storage tanks.",
    tolerance: "±0.20mm",
    weight: "160 g",
    dimensions: "100 × 100 × 70 mm",
    moq: "1,000 units",
  },
];

export const testimonials = [
  {
    quote:
      "KV Plastic took our concept from sketch to production-ready tooling in under eight weeks. Their engineering team caught design issues we'd missed.",
    name: "Anita Rao",
    role: "Head of Procurement",
    company: "Meridian Industrial Supply",
  },
  {
    quote:
      "Consistent quality across every batch, and their lead times have never slipped on us. That reliability is rare in this industry.",
    name: "Daniel Cho",
    role: "Operations Director",
    company: "Northline Components",
  },
  {
    quote:
      "We switched three product lines to KV Plastic after a competitor's tolerances kept failing QA. Zero issues since.",
    name: "Priya Menon",
    role: "Product Manager",
    company: "Vasta Consumer Goods",
  },
];

export const clientLogos = [
  "Meridian Industrial",
  "Northline Components",
  "Vasta Consumer Goods",
  "Orbit Automotive",
  "Fieldworks Agri",
  "Clearline Medical",
];

export const caseStudies = [
  {
    slug: "meridian-storage-crate-redesign",
    title: "Redesigning a Storage Crate Line for 30% Weight Reduction",
    industry: "Industrial",
    challenge:
      "Meridian's legacy crate design was over-engineered, adding shipping cost without added durability.",
    solution:
      "Rework ribbing geometry and switch to a co-polymer blend, validated with FEA before tooling.",
    outcome: "30% lighter crates, no loss in load rating, 18% freight cost reduction.",
    metric: "30% weight reduction",
  },
  {
    slug: "northline-tolerance-recovery",
    title: "Recovering OEM Tolerances After a Failed Supplier Transition",
    industry: "OEM Components",
    challenge:
      "Northline's prior supplier could not hold ±0.05mm tolerances on a precision gear housing.",
    solution:
      "New mold built in-house with tighter cavity control and 100% dimensional inspection.",
    outcome: "Zero tolerance-related rejections across 40,000+ units shipped.",
    metric: "0% rejection rate",
  },
];

export const blogPosts = [
  {
    slug: "plastic-manufacturing-processes-explained",
    title: "Plastic Manufacturing Processes, Explained",
    excerpt:
      "How injection molding, blow molding, extrusion, rotational molding, and thermoforming actually work — and how to tell which one your part needs.",
    date: "2026-07-20",
    category: "Manufacturing",
    content: `Plastics manufacturing covers everything between a resin pellet and a finished part: design, tooling, molding or forming, and the finishing steps that make a part ready to ship. Almost every process below starts from the same handful of polymer families, so the material decision and the process decision are really one decision made twice.

## Types of plastic, at a glance

- **Thermoplastics** (PE, PP, PS, PVC, ABS, PC) melt when heated and solidify when cooled, and they can be re-melted and re-molded without a chemical change. This is what makes them regrindable and what makes injection molding, blow molding, extrusion, and thermoforming possible.
- **Thermosetting plastics** (epoxy, phenolic, melamine) go through an irreversible chemical cure when heated. Once set, they can't be re-melted — which is exactly why they hold up in high-heat, high-load applications like electrical housings and automotive under-hood parts.
- **Elastomers** (rubber, silicone, TPU) are compounded with curing agents and molded under heat to produce parts that flex and return to shape — seals, gaskets, and grips.
- **Biodegradable plastics** (PLA, PHA) are processed similarly to standard thermoplastics but are formulated from renewable feedstocks and broken down by microbial action under the right conditions.

## The five processes we build around

### Injection Molding
Pellets are melted and injected under high pressure into a steel or aluminum mold cavity, held until they cool and solidify, then ejected and trimmed. It's the workhorse for anything produced in volume with tight, repeatable tolerances — packaging, enclosures, gears, connectors. The trade-off is tooling: a mold is a real up-front investment with real lead time, so it only pays off once volume justifies it.

### Blow Molding
A tube of molten plastic (a parison) is captured in a mold and expanded with compressed air until it takes the mold's shape — the standard route to any hollow part. Bottles, tanks, drums, and ducting are all blow molded because the alternative — machining a hollow part from solid stock — isn't economical at any volume. The limitation is geometry: blow molding is good at hollow and round, not at fine internal detail.

### Extrusion
Melted resin is forced continuously through a shaped die, then cooled and cut to length. Anything with a constant cross-section — pipe, tubing, sheet, window profile, cable insulation, gasket stock — is extruded rather than molded, because a die is far cheaper than a mold and the process runs continuously rather than shot-by-shot. It can't produce anything that varies along its length, which is the line where extrusion hands off to molding.

### Rotational Molding
Powdered resin is loaded into a hollow mold that rotates on two axes inside an oven; the plastic coats the mold wall evenly as it melts, then cools into a seamless, stress-free hollow part. It's the right call for large hollow parts in low-to-mid volume — tanks, kayaks, playground equipment — because rotomolding tooling is far cheaper than a blow mold, at the cost of longer cycle times and looser tolerances.

### Thermoforming
A heated plastic sheet is drawn over a mold using vacuum, pressure, or mechanical force, then trimmed to shape. It's the fast, low-tooling-cost option for trays, blister packs, interior panels, and enclosures — a thermoforming tool can cost a fraction of an injection mold, which is why it's often the right answer for shorter runs or larger, thinner parts where injection molding's tooling cost doesn't pencil out.

## Matching a part to a process

In practice the decision comes down to three questions: Is the part hollow or solid? Does its cross-section change along its length? And does the volume justify a hard mold, or does the run length favor cheaper tooling and a faster start? Most parts answer these questions cleanly — the harder cases usually involve a hybrid, like an extruded profile that's later assembled with injection-molded end caps.

## Sustainability is now a process decision, not an afterthought

Resin selection increasingly includes recycled content and end-of-life planning alongside the usual mechanical and cost criteria. Post-consumer and post-industrial regrind is now viable in many non-cosmetic, non-food-contact parts; biodegradable resins fit a narrower set of applications where composting infrastructure actually exists; and closed-loop programs — where a manufacturer takes back scrap and sprue for regrind — are becoming a standard line item in RFQs rather than an exception.

If you're not sure which of these five processes fits your part, that's the first thing our engineering team sorts out on a quote call — [send us your drawings](/request-quote) and we'll tell you plainly which process, and which resin, gets you to production fastest.`,
  },
  {
    slug: "choosing-the-right-resin",
    title: "Choosing the Right Resin for Your Application",
    excerpt:
      "A practical framework for narrowing down ABS, PP, HDPE, and engineered resins before you commit to tooling.",
    date: "2026-06-02",
    category: "Materials",
    content: `Picking a resin before tooling starts is one of the few decisions on a project that's expensive to reverse — a mold cut for one material's shrink rate doesn't always transfer cleanly to another. Here's the framework we walk clients through before a quote goes final.

## Start with the load case, not the catalog

Before comparing resins, pin down what the part actually has to survive: mechanical load and impact, sustained temperature range, chemical or UV exposure, and any regulatory requirement (food contact, medical, flame rating). Everything else is a filter applied on top of that list.

## The common resins, and where each one wins

- **HDPE** — tough, chemical-resistant, and cheap. The default for tanks, crates, and outdoor fittings where impact resistance matters more than tight tolerance.
- **PP** — lighter than HDPE with better fatigue resistance, which makes it the standard choice for living hinges and snap-fit consumer parts that get flexed repeatedly.
- **ABS** — dimensionally stable and easy to finish (paint, plate, texture), so it's the go-to for enclosures and consumer housings where appearance matters as much as strength.
- **Polycarbonate (PC)** — high impact strength and heat resistance, standard for parts that need to survive both drops and elevated temperatures, from device enclosures to automotive components.
- **PET** — excellent clarity and barrier properties, which is why it dominates packaging and anything that needs to look and stay clean.
- **Engineered resins** (glass-filled nylon, PC/ABS blends, and similar) — specified when a standard commodity resin can't hit a specific stiffness, heat-deflection, or dimensional-stability target. They cost more per kilogram but can eliminate a secondary metal insert or bracket entirely.

## Thermoplastic, thermoset, or elastomer

Most of the resins above are thermoplastics — they melt and re-solidify without a chemical change, which is what makes injection molding, extrusion, and regrinding possible. If a part needs to hold its shape under sustained heat well beyond what a thermoplastic can take, a thermoset (epoxy, phenolic) is worth evaluating instead, with the trade-off that thermoset scrap can't be re-melted and reused. If the part needs to flex and return to shape — a seal, a gasket, a soft-touch grip — you're looking at an elastomer, not a rigid resin at all.

## Where sustainability fits the decision

Recycled content is a viable spec for most non-cosmetic, non-food-contact parts today, and it's worth asking for a regrind or post-consumer resin quote alongside virgin material — the cost gap has narrowed. For applications where the part is genuinely expected to be composted rather than recycled, PLA and other biodegradable resins are worth a look, but they trade off heat resistance and long-term stability, so they're rarely a drop-in replacement for a structural part.

## Don't skip the sample

Datasheet properties are measured on standardized test bars, not on your part's actual wall thickness and gate location — real-world performance can shift once flow length, wall transitions, and cooling rate enter the picture. We run material trials before committing to production tooling for exactly this reason.

Send us your part's load case, environment, and target volume through our [quote form](/request-quote) and we'll come back with two or three resin options, not just one.`,
  },
  {
    slug: "injection-molding-tolerances-explained",
    title: "Injection Molding Tolerances, Explained",
    excerpt:
      "What ±0.05mm actually means for your part, and when it's worth paying for.",
    date: "2026-05-14",
    category: "Manufacturing",
    content: `A tolerance callout like ±0.05mm looks like a single number, but it's really a statement about mold precision, material behavior, and process control working together. Here's what's actually behind it.

## What happens inside the mold

Injection molding runs in five steps: resin pellets are loaded and melted, the melt is injected into a mold cavity under high pressure, the part cools and solidifies against the cavity walls, ejector pins release it, and any gates or flash are trimmed in post-processing. Every one of those steps introduces a small, predictable amount of dimensional variation — and tolerance is the budget you set for that variation.

## Where the variation actually comes from

- **Material shrinkage.** Every resin shrinks a specific, known percentage as it cools from melt to solid — semi-crystalline resins like HDPE and PP shrink more, and less predictably, than amorphous resins like ABS and PC. The mold is cut oversized to compensate, but shrink rate itself varies slightly with wall thickness and cooling rate.
- **Wall thickness transitions.** Thick sections cool slower than thin ones, and uneven cooling within a single part is the most common source of warp and dimensional drift.
- **Gate location.** Flow length and pressure drop from the gate to the far end of the cavity affect how completely — and how consistently — the cavity packs out.
- **Mold wear.** A hardened steel mold holds tolerance far longer than an aluminum prototype tool, which matters if a program is expected to run into the hundreds of thousands of cycles.

## Reading a tolerance spec

A standard commercial tolerance for injection-molded parts runs around ±0.10–0.20mm, which is achievable on most tools without any special process control. Precision tolerances in the ±0.05mm range and tighter are achievable, but they call for hardened steel tooling, tighter material lot-to-lot control, and 100% dimensional inspection rather than sample checks — all of which show up in the quote. Before specifying a tight tolerance across an entire part, it's worth asking whether it's actually needed everywhere, or only at a mating feature or bearing surface — tolerancing only the features that need it is usually the cheapest way to hit a functional requirement.

## What we do differently

Our tooling team maps expected shrinkage and cooling behavior into the mold design before it's cut, and every precision-tolerance program runs with 100% dimensional inspection rather than statistical sampling — which is how we've kept tolerance-related rejections at zero across long production runs.

If you have a drawing with a tolerance callout already on it, [send it to us](/request-quote) and we'll tell you straight away whether it's a standard-tooling job or a precision one — and what that does to lead time and cost.`,
  },
  {
    slug: "preparing-cad-files-for-quote",
    title: "How to Prepare CAD Files for a Faster Quote",
    excerpt:
      "The file formats and details that shave days off your RFQ turnaround.",
    date: "2026-04-22",
    category: "RFQ Process",
    content: `The single biggest lever on RFQ turnaround time isn't how complex your part is — it's how complete the file package is when it lands in our inbox. Here's what a complete package looks like.

## File formats that work

- **3D model:** STEP (.step/.stp) is the safest neutral format across CAD systems. IGES works but can lose surface data on complex geometry. Native files (SolidWorks, etc.) are fine too, as long as you tell us the version.
- **2D drawing:** A dimensioned PDF or DWG alongside the 3D model, even a rough one, saves a round of clarifying emails. If tolerances only live in the 3D model as a hidden note, call that out explicitly.

## What the drawing needs to carry

- **Critical dimensions and tolerances**, called out explicitly rather than left at a blanket default — see our [tolerance explainer](/blog/injection-molding-tolerances-explained) for what standard versus precision tolerancing actually costs.
- **Material and grade**, or the application and environment if the material isn't decided yet — see our [resin selection guide](/blog/choosing-the-right-resin) if you're starting from scratch.
- **Surface finish and cosmetic requirements**, especially any A-surface (visible, cosmetic) versus B-surface (hidden, functional) distinction.
- **Draft angle assumptions**, if you've already built any into the model — if not, tell us and we'll add what the tool needs.
- **Any GD&T callouts** (flatness, concentricity, position) on mating or bearing features, since these often drive tooling decisions more than the overall dimensions do.

## Quantity and timeline, up front

A quote for 500 units and a quote for 50,000 units are different conversations — the first is priced around tooling amortization, the second around cycle time and material cost. Give us your target volume (even a range) and your need-by date on the first submission rather than after the initial quote comes back, and we can skip a round trip.

## What slows a quote down

The most common thing that stalls an RFQ isn't a hard part — it's a 3D model with no drawing and no tolerance information, which forces us to ask questions before we can price anything. A rough sketch with real numbers on it beats a beautiful render with none.

Ready to send yours over? Our [request-a-quote form](/request-quote) accepts STEP, IGES, and native CAD files directly, and most complete packages get a response within two business days.`,
  },
];
