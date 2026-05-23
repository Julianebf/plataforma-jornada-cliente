# Engenharia e Governança de Dados da Jornada do Cliente

Pipeline ETL desenvolvido para construção de uma visão 360° da jornada do cliente utilizando Python, Pandas e conceitos de Governança de Dados.

O projeto realiza:
- integração de múltiplas fontes de dados;
- validações de qualidade;
- análises de consistência;
- feature engineering;
- métricas analíticas;
- construção de camada Trusted para dados governados.

---

# Arquitetura do Projeto

```text
governacaprojeto20-05/
│
├── api/
├── dashboards/
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── trusted/
│
├── docs/
├── logs/
├── notebooks/
│
├── pipelines/
│   ├── etl_jornada_cliente.py
│   ├── quality.py
│   ├── monitoring.py
│   └── lineage.py
│
├── sql/
├── README.md
└── requirements.txt