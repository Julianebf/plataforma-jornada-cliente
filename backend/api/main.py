from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

app = FastAPI()

# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "mensagem": "API Jornada Cliente online 🚀"
    }

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD DATA
# =========================

df = pd.read_csv(
    "data/trusted/jornada_cliente_trusted.csv"
)

# =========================
# DASHBOARD
# =========================

@app.get("/dashboard")
def dashboard():

    total_registros = len(df)

    inconsistencias = int(
        df.isnull().sum().sum()
    )

    tempo_medio_entrega = round(
        df["tempo_entrega_dias"].mean(),
        1
    )

    # STATUS
    status = (
        df["order_status"]
        .value_counts()
        .reset_index()
    )

    status.columns = ["name", "value"]

    status_pedidos = status.to_dict(
        orient="records"
    )

    # PAGAMENTOS
    pagamentos = (
        df["payment_type"]
        .value_counts()
        .reset_index()
    )

    pagamentos.columns = ["name", "value"]

    pagamentos_data = pagamentos.to_dict(
        orient="records"
    )

    # NPS
    total_reviews = len(df)

    detratores = (
        (df["review_score"] <= 2)
        .sum()
    )

    neutros = (
        (df["review_score"] == 3)
        .sum()
    )

    promotores = (
        (df["review_score"] >= 4)
        .sum()
    )

    nps = {
        "detratores": round(
            detratores / total_reviews * 100,
            1
        ),

        "neutros": round(
            neutros / total_reviews * 100,
            1
        ),

        "promotores": round(
            promotores / total_reviews * 100,
            1
        ),
    }

    return {
        "total_registros": total_registros,
        "score_qualidade": 100,
        "inconsistencias": inconsistencias,
        "tempo_medio_entrega": tempo_medio_entrega,
        "status_pedidos": status_pedidos,
        "pagamentos": pagamentos_data,
        "nps": nps,
    }