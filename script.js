
/* =========================================
   STORAGE
========================================= */

const getAll = () => {
    try {
        return JSON.parse(
            localStorage.getItem("lab_rpts") || "[]"
        );
    } catch {
        return [];
    }
};

const setAll = a => {
    localStorage.setItem("lab_rpts", JSON.stringify(a));
};

const getOne = id => {
    return getAll().find(r => r.id === id);
};

const upsert = r => {

    const a = getAll();

    const i = a.findIndex(x => x.id === r.id);

    if (i >= 0) {
        a[i] = r;
    } else {
        a.unshift(r);
    }

    setAll(a);
};

const remove = id => {
    setAll(getAll().filter(r => r.id !== id));
};

const uid = () => {
    return "R" + Date.now() + Math.floor(Math.random() * 999);
};

const today = () => {
    const d = new Date();

    const year = d.getFullYear();

    const month = String(d.getMonth() + 1).padStart(2, "0");

    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const fmt = s => {

    if (!s) return "";

    const d = new Date(s + "T00:00:00");

    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

const esc = s => {

    return String(s || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};


/* =========================================
   TEST TEMPLATES
========================================= */

const TPLS = {

    CBC: {
        name: "Complete Blood Count (CBC)",

        tests: [

            { n: "Haemoglobin (Hb)", u: "g/dL", r: "13.0-17.0 (M) / 11.5-15.5 (F)" },

            { n: "Total RBC Count", u: "mill/cmm", r: "4.5-5.5 (M) / 3.8-4.8 (F)" },

            { n: "Haematocrit (PCV)", u: "%", r: "40-50 (M) / 36-46 (F)" },

            { n: "MCV", u: "fL", r: "83-101" },

            { n: "MCH", u: "pg", r: "27-32" },

            { n: "MCHC", u: "g/dL", r: "31.5-34.5" },

            { n: "RDW-CV", u: "%", r: "11.6-14.0" },

            { n: "Total WBC Count", u: "cells/cmm", r: "4000-11000" },

            { n: "Neutrophils", u: "%", r: "40-75" },

            { n: "Lymphocytes", u: "%", r: "20-45" },

            { n: "Monocytes", u: "%", r: "2-10" },

            { n: "Eosinophils", u: "%", r: "1-6" },

            { n: "Basophils", u: "%", r: "0-1" },

            { n: "Platelet Count", u: "lakh/cmm", r: "1.5-4.5" }

        ]
    },


    THYROID: {
        name: "Thyroid Profile",

        tests: [

            { n: "T3 (Tri-iodothyronine)", u: "ng/dL", r: "60-200" },

            { n: "T4 (Thyroxine)", u: "µg/dL", r: "4.5-12.5" },

            { n: "TSH (Thyroid Stimulating Hormone)", u: "µIU/mL", r: "0.35-5.50" },

            { n: "Free T3 (FT3)", u: "pg/mL", r: "2.3-4.2" },

            { n: "Free T4 (FT4)", u: "ng/dL", r: "0.89-1.76" }

        ]
    },


    LFT: {
        name: "Liver Function Test (LFT)",

        tests: [

            { n: "Total Bilirubin", u: "mg/dl", r: "Upto 1.00 mg/dl" },

            { n: "Direct Bilirubin", u: "mg/dl", r: "Upto 0.25 mg/dl" },

            { n: "Indirect Bilirubin", u: "mg/dl", r: "Upto 0.75 mg/dl" },

            { n: "SGOT (AST)", u: "U/L", r: "10-40" },

            { n: "SGPT (ALT)", u: "U/L", r: "7-56" },

            { n: "Alkaline Phosphatase (ALP)", u: "U/L", r: "44-147" },

            { n: "GGT", u: "U/L", r: "8-61 (M) / 5-36 (F)" },

            { n: "Total Protein", u: "g/dL", r: "6.3-8.2" },

            { n: "Albumin", u: "g/dL", r: "3.5-5.0" },

            { n: "Globulin", u: "g/dL", r: "2.0-3.5" },

            { n: "A/G Ratio", u: "", r: "1.1-2.5" }

        ]
    },


    KFT: {
        name: "Kidney Function Test (KFT)",

        tests: [

            { n: "Blood Urea", u: "mg/dL", r: "15-45" },

            { n: "Serum Creatinine", u: "mg/dL", r: "0.7-1.4 (M) / 0.5-1.1 (F)" },

            { n: "Uric Acid", u: "mg/dL", r: "3.4-7.0 (M) / 2.4-5.7 (F)" },

            { n: "BUN (Blood Urea Nitrogen)", u: "mg/dL", r: "7-20" },

            { n: "Sodium (Na+)", u: "mEq/L", r: "136-146" },

            { n: "Potassium (K+)", u: "mEq/L", r: "3.5-5.0" },

            { n: "Chloride (Cl-)", u: "mEq/L", r: "98-107" },

            { n: "Calcium", u: "mg/dL", r: "8.5-10.5" },

            { n: "Phosphorus", u: "mg/dL", r: "2.5-4.5" }

        ]
    },


    LIPID: {
        name: "Lipid Profile",

        tests: [

            { n: "Cholesterol", u: "mg/dl", r: "130-200 mg/dl" },

            { n: "Triglycerides", u: "mg/dl", r: "60-165 mg/dl" },

            { n: "HDL Cholesterol", u: "mg/dl", r: ">35 mg/dl" },

            { n: "LDL Cholesterol", u: "mg/dl", r: "Upto 100 mg/dl" },

            { n: "VLDL Cholesterol", u: "mg/dl", r: "Up to 50 mg/dl" },

            { n: "CHO / HDL Ratio", u: "", r: "" },

            { n: "LDL / HDL Ratio", u: "", r: "" }

        ]
    },


    SUGAR: {
        name: "Blood Sugar",

        tests: [

            { n: "Fasting Blood Sugar (FBS)", u: "mgs%", r: "70-110 mgs%" },

            { n: "Post Prandial Blood Sugar (PPBS)", u: "mgs%", r: "Upto 140 mgs%" },

            { n: "Random Blood Sugar (RBS)", u: "mgs%", r: "80-150 mgs%" },

            { n: "HbA1c (Glycated Haemoglobin)", u: "%", r: "< 5.7" }

        ]
    }

};


/* =========================================
   STATE
========================================= */

let CID = null;

let ROWS = [];

let CTPL = "Custom";


/* =========================================
   INTRO ANIMATION
========================================= */

const introScreen = document.getElementById("intro-screen");

const introVideo = document.getElementById("intro-video");

let introFinished = false;


// Finish intro

function finishIntro() {

    if (introFinished) return;

    introFinished = true;

    introScreen.classList.add("hide");

    introVideo.pause();

    setTimeout(() => {

        introScreen.style.display = "none";

    }, 800);

}


// Skip intro

function skipIntro() {

    finishIntro();

}


// Video ended

introVideo.addEventListener("ended", () => {

    finishIntro();

});


// Video error

introVideo.addEventListener("error", () => {

    finishIntro();

});


// Autoplay video

introVideo.play().catch(() => {

    finishIntro();

});


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(s => {

        s.classList.remove("active");

    });

    document.getElementById("screen-" + id).classList.add("active");

    window.scrollTo(0, 0);

}


function showDash() {

    showScreen("dashboard");

    renderDash();

}


/* =========================================
   DASHBOARD
========================================= */

function renderDash() {

    const all = getAll();

    const now = new Date();


    document.getElementById("s-total").textContent = all.length;


    document.getElementById("s-pts").textContent =

        new Set(
            all.map(r => (r.patient.name || "").toLowerCase())
        ).size;


    document.getElementById("s-month").textContent =

        all.filter(r => {

            const d = new Date(r.createdAt);

            return d.getMonth() === now.getMonth() &&

                d.getFullYear() === now.getFullYear();

        }).length;


    renderTable();

}


/* =========================================
   REPORT TABLE
========================================= */

function renderTable() {

    const q = (

        document.getElementById("q").value || ""

    ).toLowerCase();


    const rows = getAll().filter(r =>

        (r.patient.name || "").toLowerCase().includes(q) ||

        (r.patient.id || "").toLowerCase().includes(q)

    );


    const w = document.getElementById("tbl-wrap");


    if (!rows.length) {

        w.innerHTML = `

            <div class="empty">

                <div class="empty-ic">⚗</div>

                <p>

                    ${q
                        ? "No reports match your search."
                        : "No reports yet. Create your first report."
                    }

                </p>

                ${!q
                    ? '<br><button class="btn btn-primary" onclick="goNew()">Create Report</button>'
                    : ""
                }

            </div>

        `;

        return;

    }


    w.innerHTML = `

        <table class="dtable">

            <thead>

                <tr>

                    <th>Patient</th>

                    <th>ID</th>

                    <th>Test</th>

                    <th>Sample Date</th>

                    <th>Report Date</th>

                    <th style="text-align:right">Actions</th>

                </tr>

            </thead>


            <tbody>

                ${rows.map(r => `

                    <tr>

                        <td>

                            <div class="pt-name">

                                ${esc(r.patient.name)}

                            </div>

                            <div class="pt-sub">

                                ${esc(r.patient.age)} yrs ·

                                ${esc(r.patient.gender)}

                            </div>

                        </td>


                        <td>

                            <span class="mono">

                                ${esc(r.patient.id)}

                            </span>

                        </td>


                        <td>

                            <span class="badge">

                                ${esc(r.templateName || "Custom")}

                            </span>

                        </td>


                        <td style="font-size:12px;color:#64748b">

                            ${fmt(r.patient.sampleDate)}

                        </td>


                        <td style="font-size:12px;color:#64748b">

                            ${fmt(r.reportDate)}

                        </td>


                        <td>

                            <div class="acts">

                                <button
                                    class="icon-btn"
                                    title="Preview"
                                    onclick="doView('${r.id}')">

                                    👁

                                </button>


                                <button
                                    class="icon-btn"
                                    title="Edit"
                                    onclick="goEdit('${r.id}')">

                                    ✏️

                                </button>


                                <button
                                    class="icon-btn"
                                    title="Duplicate"
                                    onclick="doDup('${r.id}')">

                                    📋

                                </button>


                                <button
                                    class="icon-btn"
                                    title="Delete"
                                    onclick="doDel('${r.id}')">

                                    🗑

                                </button>

                            </div>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}


/* =========================================
   DELETE REPORT
========================================= */

function doDel(id) {

    if (!confirm("Delete this report?")) return;

    remove(id);

    renderDash();

    toast("Deleted.");

}


/* =========================================
   DUPLICATE REPORT
========================================= */

function doDup(id) {

    const r = getOne(id);

    if (!r) return;


    upsert({

        ...r,

        id: uid(),

        patient: {

            ...r.patient,

            id: (r.patient.id || "") + "-COPY"

        },

        reportDate: today(),

        createdAt: new Date().toISOString()

    });


    renderDash();

    toast("Duplicated.");

}


/* =========================================
   NEW REPORT
========================================= */

function goNew() {

    CID = uid();

    ROWS = [];

    CTPL = "Custom";


    setFields({

        name: "",

        id: "",

        age: "",

        gender: "Male",

        referringDoctor: "",

        sampleDate: today()

    });


    document.getElementById("f-rdate").value = today();


    document.getElementById("ed-title").textContent = "New Report";


    buildTpls("Custom");


    addRow();


    showScreen("editor");

}


/* =========================================
   EDIT REPORT
========================================= */

function goEdit(id) {

    const r = getOne(id);

    if (!r) return;


    CID = id;

    ROWS = r.rows.map(x => ({ ...x }));

    CTPL = r.templateName || "Custom";


    setFields(r.patient);


    document.getElementById("f-rdate").value = r.reportDate || today();


    document.getElementById("ed-title").textContent =

        "Edit Report — " + CTPL;


    buildTpls(CTPL);


    renderRows();


    showScreen("editor");

}


/* =========================================
   PATIENT FIELDS
========================================= */

function setFields(p) {

    document.getElementById("f-name").value = p.name || "";

    document.getElementById("f-id").value = p.id || "";

    document.getElementById("f-age").value = p.age || "";

    document.getElementById("f-gen").value = p.gender || "Male";

    document.getElementById("f-ref").value = p.referringDoctor || "";

    document.getElementById("f-sdate").value = p.sampleDate || today();

}


/* =========================================
   BUILD TEMPLATES
========================================= */

function buildTpls(active) {

    const items = [

        { k: "CUSTOM", l: "Custom" },

        ...Object.entries(TPLS).map(([k, v]) => ({

            k,

            l: v.name

        }))

    ];


    document.getElementById("tpls").innerHTML = items.map(x => `

        <button

            class="tpl-btn${x.l === active || x.k === active ? " on" : ""}"

            onclick="applyTpl('${x.k}','${esc(x.l)}')">

            ${esc(x.l)}

        </button>

    `).join("");

}


/* =========================================
   APPLY TEMPLATE
========================================= */

function applyTpl(key, label) {

    CTPL = label;


    document.getElementById("ed-title").textContent =

        "Report — " + label;


    buildTpls(label);


    if (key === "CUSTOM") {

        ROWS = [];

        addRow();

        return;

    }


    ROWS = TPLS[key].tests.map(t => ({

        id: Math.random(),

        name: t.n,

        result: "",

        unit: t.u,

        refRange: t.r

    }));


    renderRows();

}


/* =========================================
   RENDER RESULT ROWS
========================================= */

function renderRows() {

    document.getElementById("rows-body").innerHTML = ROWS.map((r, i) => `

        <tr>

            <td>

                <input

                    value="${esc(r.name)}"

                    placeholder="e.g. CHOLESTEROL"

                    oninput="ROWS[${i}].name=this.value"

                />

            </td>


            <td>

                <input

                    value="${esc(r.result)}"

                    placeholder="166"

                    oninput="ROWS[${i}].result=this.value"

                />

            </td>


            <td>

                <input

                    value="${esc(r.unit)}"

                    placeholder="mg/dl"

                    oninput="ROWS[${i}].unit=this.value"

                />

            </td>


            <td>

                <input

                    value="${esc(r.refRange)}"

                    placeholder="130-200 mg/dl"

                    oninput="ROWS[${i}].refRange=this.value"

                />

            </td>


            <td style="text-align:center">

                <button

                    class="icon-btn"

                    onclick="removeRow(${i})"

                    title="Remove"

                    style="font-size:13px">

                    ✕

                </button>

            </td>

        </tr>

    `).join("");


    document.getElementById("row-cnt").textContent =

        ROWS.length + " rows";

}


/* =========================================
   ADD RESULT ROW
========================================= */

function addRow() {

    ROWS.push({

        id: Math.random(),

        name: "",

        result: "",

        unit: "",

        refRange: ""

    });


    renderRows();

}


/* =========================================
   REMOVE RESULT ROW
========================================= */

function removeRow(i) {

    ROWS.splice(i, 1);

    renderRows();

}


/* =========================================
   GET PATIENT INFORMATION
========================================= */

function getPt() {

    return {

        name: document.getElementById("f-name").value,

        id: document.getElementById("f-id").value,

        age: document.getElementById("f-age").value,

        gender: document.getElementById("f-gen").value,

        referringDoctor: document.getElementById("f-ref").value,

        sampleDate: document.getElementById("f-sdate").value

    };

}


/* =========================================
   SAVE REPORT
========================================= */

function doSave() {

    upsert({

        id: CID,

        patient: getPt(),

        rows: [...ROWS],

        templateName: CTPL,

        reportDate: document.getElementById("f-rdate").value,

        createdAt: new Date().toISOString()

    });


    const b = document.getElementById("save-btn");


    b.textContent = "✓ Saved!";

    b.className = "btn btn-saved";


    setTimeout(() => {

        b.textContent = "💾 Save";

        b.className = "btn btn-secondary";

    }, 2000);


    toast("Report saved.");

}


/* =========================================
   PRINT PREVIEW
========================================= */

function doPrint() {

    doSave();

    buildPreview();

    showScreen("preview");

}


/* =========================================
   VIEW REPORT
========================================= */

function doView(id) {

    goEdit(id);


    setTimeout(() => {

        buildPreview();

        showScreen("preview");

    }, 30);

}


/* =========================================
   BUILD PRINT PREVIEW
========================================= */

function buildPreview() {

    const pt = getPt();


    document.getElementById("prev-name").textContent =

        pt.name || "—";


    document.getElementById("p-name").textContent =

        pt.name ? " " + pt.name.toUpperCase() : "";


    document.getElementById("p-sex").textContent =

        pt.gender ? " " + pt.gender : "";


    document.getElementById("p-date").textContent =

        pt.sampleDate ? " " + fmt(pt.sampleDate) : "";


    document.getElementById("p-age").textContent =

        pt.age ? " " + pt.age : "";


    document.getElementById("p-ref").textContent =

        pt.referringDoctor

            ? " " + pt.referringDoctor.toUpperCase()

            : "";


    document.getElementById("p-id").textContent =

        pt.id ? " " + pt.id : "";


    document.getElementById("p-rows").innerHTML = ROWS.map(r => `

        <tr>

            <td>${esc(r.name)}</td>

            <td class="r">${esc(r.result)}</td>

            <td class="u">${esc(r.unit)}</td>

            <td class="nr">${esc(r.refRange)}</td>

        </tr>

    `).join("");

}


/* =========================================
   TOAST NOTIFICATION
========================================= */

function toast(msg) {

    const t = document.getElementById("toast");


    t.textContent = msg;

    t.classList.add("show");


    setTimeout(() => {

        t.classList.remove("show");

    }, 2200);

}


/* =========================================
   INITIALIZE APPLICATION
========================================= */

renderDash();
