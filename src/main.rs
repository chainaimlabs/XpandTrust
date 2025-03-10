#![allow(unused)]
use core::hash;
// use gkr::{ services::g_prove };
// use gkr::gprove::g_prove;

use ecc1::{ gprove, verify_prove };
use gkr_field_config::GKRFieldConfig;
use serde_json as s_json;
use expander_compiler::{
    circuit::ir::common::serde,
    frontend::{ extra::debug_eval, Config as Con, * },
    utils::serde::Serde,
};
use config::{ Config, GKRConfig, GKRScheme, PolynomialCommitmentType };
use mpi_config::MPIConfig;
use gprove::g_prove;
use gkr::BN254ConfigSha2Raw;
struct ComplianceData {
    company_id: String, // CIN
    company_name: String, // Company Name
    roc: String, // ROC
    registration_number: BN254, // Registration Number
    incorporation_date: String, // Incorporation Date
    email: String, // Email
    corporate_address: String, // Corporate Address
    listed: BN254, // Listed (boolean as Field)
    company_type: String, // Company Type
    company_category: String, // Company Category
    company_subcategory: String, // Company Subcategory
    company_status: String, // Company Status
    authorized_capital: BN254, // Authorized Capital
    paid_up_capital: BN254, // Paid-up Capital
    last_agm_date: String, // Last AGM Date
    balance_sheet_date: String, // Balance Sheet Date
    active_compliance: String, // Active Compliance
    company_activity: String, // Company Activity
    jurisdiction: String, // Jurisdiction
    regional_director: String, // Regional Director
    mca_id: BN254, // MCA ID
}

fn generate_prove() {
    //  let config = &(Config {
    //      field_size: 0,
    //      security_bits: 0,
    //      polynomial_commitment_type: PolynomialCommitmentType::Raw,
    //      gkr_config: BN254ConfigSha2Raw,
    //      gkr_scheme: GKRScheme::GkrSquare, // Example GKR scheme name
    //      mpi_config: MPIConfig::default(),
    //  });

    //     let new_prove = Prover::new(config);
    //     let c = &ComCircuit::default();
    //     let pcs_params = &new_prove.pcs_params;
    //     let pcs_proving_key = &new_prove.pcs_proving_key;
    //     let pcs_scratch = &new_prove.pcs_scratch;
    //     new_prove.prove(c, pcs_params, pcs_proving_key, pcs_scratch);
    //  prove(circuit, config)
}
fn get_circuit_inputs() {
    //  let url = std::env::var("COMPLIANCE_URL").unwrap_or("http://localhost:3000".to_string());
    let url = "https://0f4aef00-9db0-4057-949e-df6937e3449b.mock.pstmn.io/vernon_mca";
    let response = reqwest::blocking::get(url).expect("Failed to send request");
    let body = response.text().expect("Failed to get response body");
    println!("Body: {}", body);
}

declare_circuit!(ComCircuit {
    a: Variable, // active compliance
    b: Variable,
    target: PublicVariable,
});
impl Define<BN254Config> for ComCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        let mut a: Variable = self.a;
        let mut b: Variable = self.b;

        api.assert_is_equal(b, self.target);
    }
}

declare_circuit!(ThreeCircuit {
    a: Variable, // proof_a
    b: Variable, // proof_b
    target: PublicVariable,
});

impl Define<BN254Config> for ThreeCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        let mut proof_a: Variable = self.a;
        let mut proof_b: Variable = self.b;

        let x = api.mul(proof_a, proof_b);
        api.mul(x, self.target);
    }
}

fn three_tier_proof() {
    let mut three_result = compile(&ThreeCircuit::default(), CompileOptions::default()).unwrap();

    //mock data
    let proof_a = BN254::from(1_u32);
    let proof_b = BN254::from(1_u32);
    let mut assignment: ThreeCircuit<BN254> = ThreeCircuit {
        a: proof_a,
        b: proof_b,
        target: BN254::from(1_u32),
    };
    assignment.target = proof_b;

    let witness = three_result.witness_solver.solve_witness(&assignment).unwrap();
    let file = std::fs::File::create("three_circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    three_result.layered_circuit.serialize_into(writer);

    let run_result = three_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);

    let file = std::fs::File::create("three_witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    debug_eval(&ThreeCircuit::default(), &assignment, EmptyHintCaller);
}
fn main() {
    get_circuit_inputs();
    three_tier_proof();
    let mut compile_result = compile(&ComCircuit::default(), CompileOptions::default()).unwrap();

    let active_compliance = BN254::from(1_u32);
    let mut assignment = ComCircuit {
        a: active_compliance,
        b: BN254::from(1_u32),
        target: BN254::from(2_u32),
    };
    assignment.target = active_compliance;

    let witness = compile_result.witness_solver.solve_witness(&assignment).unwrap();
    println!("Witness: {:?}", witness);
    // india - 3am - Ghana - 9:29pm
    let file = std::fs::File::create("circuit2.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result.layered_circuit.serialize_into(writer);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);
    let file = std::fs::File::create("witness2.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    let mpi_config = MPIConfig::new();
    let mut config: Config<BN254ConfigSha2Raw> = Config::new(
        GKRScheme::Vanilla,
        mpi_config.clone()
    );
    g_prove::<BN254ConfigSha2Raw>(
        "circuit2.txt".to_string(),
        "witness2.txt".to_string(),
        "proof.txt".to_string(),
        config.clone()
    );
    let circuit_file = "circuit2.txt";
    let witness_file = "witness2.txt";
    let input_proof_file = "proof.txt";

    verify_prove(circuit_file, witness_file, input_proof_file, 1, config);

    debug_eval(&ComCircuit::default(), &assignment, EmptyHintCaller);
}
