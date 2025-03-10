#![allow(unused)]
use serde_json as s_json;
use expander_compiler::{
    circuit::ir::common::serde,
    frontend::{ extra::debug_eval, * },
    utils::serde::Serde,
};

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
// registration_number: Field,         // Registration Number
// authorizedCapital: Field,          // Authorized Capital
// paidUpCapital: Field,              // Paid-up Capital
// mcaID: Field,                      // MCA ID
// listed: Field,                     // Listed (boolean as Field)

//  registration_number: Variable,
//  authorized_capital: Variable,
//  paid_up_capital: Variable,
//  mca_id: Variable,
declare_circuit!(ComplianceCircuit {
    active: Variable,
    target: PublicVariable,
});

impl Define<BN254Config> for ComplianceCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        //   let registration_number: Variable = self.registration_number;
        //   let authorized_capital: Variable = self.authorized_capital;
        //   let paid_up_capital: Variable = self.paid_up_capital;
        //   let mca_id: Variable = self.mca_id;
        let active_compliance = self.active;
        let compliance_code = BN254::from(1_u32);
        //   api.display("registration_number", registration_number);
        //   api.display("authorized_capital", authorized_capital);
        //   api.display("paid_up_capital", paid_up_capital);
        //   api.display("mca_id", mca_id);
        //   let target = api.add(registration_number, authorized_capital);

        //   // using (mca_id * paid_up_capital) as target
        //   // in this case: target = hash(paid_up_capital * mca_id)
        //   let new_target = api.mul(paid_up_capital, mca_id);
        //   api.assert_is_equal(new_target, target);
        //   api.assert_is_equal(active_compliance, 1);
        //   api.display(active_compliance, compliance_code);
        api.assert_is_equal(compliance_code, 1)
        //   api.assert_is_equal(registration_number, self.target);
    }
}

fn execute_compliance_circuit() {
    let compile_result = compile(&ComplianceCircuit::default(), CompileOptions::default()).unwrap();

    let active_compliance = BN254::from(1_u32);
    let mut assignment = ComplianceCircuit {
        //   registration_number: BN254::from(0_u32), // exposes company data
        //   authorized_capital: BN254::from(0_u32),
        //   paid_up_capital: BN254::from(0_u32),
        active: active_compliance,
        //   mca_id: BN254::from(0_u32), // exposes company data
        target: BN254::from(0_u32),
    };
    assignment.target = active_compliance;

    let witness = compile_result.witness_solver.solve_witness(&assignment).unwrap();
    println!("Witness: {:?}", witness);
    // india - 3am - Ghana - 9:29pm
    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result.layered_circuit.serialize_into(writer);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);
    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    debug_eval(&ComplianceCircuit::default(), &assignment, EmptyHintCaller);
}

// complianceData: ComplianceData Import  -> json
declare_circuit!(MyCircuit {
    a: Variable,
    b: Variable,
    target: PublicVariable,
});
impl Define<BN254Config> for MyCircuit<Variable> {
    fn define<Builder: RootAPI<BN254Config>>(&self, api: &mut Builder) {
        let mut a: Variable = self.a;
        let mut b: Variable = self.b;

        for i in 0..30 {
            let c = api.add(a, b);
            a = b;
            b = c;
            api.display(&format!("b{}", i), b);
        }
        api.assert_is_equal(b, self.target);
    }
}

//gaza

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

        for i in 0..30 {
            let c = api.add(a, b);
            a = b;
            b = c;
            api.display(&format!("b{}", i), b);
        }
        api.assert_is_equal(b, self.target);
    }
}
fn main() {
    get_circuit_inputs();
    let compile_result = compile(&ComCircuit::default(), CompileOptions::default()).unwrap();

    let active_compliance = BN254::from(0_u32);
    let mut assignment = ComplianceCircuit {
        active: active_compliance,
        target: BN254::from(2_u32),
    };
    assignment.target = active_compliance;

    let witness = compile_result.witness_solver.solve_witness(&assignment).unwrap();
    println!("Witness: {:?}", witness);
    // india - 3am - Ghana - 9:29pm
    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result.layered_circuit.serialize_into(writer);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);
    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer);

    debug_eval(&ComplianceCircuit::default(), &assignment, EmptyHintCaller);
    //
    //  execute_compliance_circuit();
    let compile_result = compile(&MyCircuit::default(), CompileOptions::default()).unwrap();

    let mut a = BN254::from(10_u32);
    let mut b = BN254::from(17_u32);
    let mut assignment = MyCircuit::<BN254> {
        a,
        b,
        target: BN254::from(0_u32),
    };
    for _ in 0..30 {
        let c = a + b;
        a = b;
        b = c;
    }
    assignment.target = b;

    let witness = compile_result.witness_solver.solve_witness(&assignment).unwrap();
    println!("Witness: {:?}", witness);

    let run_result = compile_result.layered_circuit.run(&witness);
    println!("Run result: {:?}", run_result);

    let file = std::fs::File::create("circuit.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    compile_result.layered_circuit.serialize_into(writer);

    let file = std::fs::File::create("witness.txt").unwrap();
    let writer = std::io::BufWriter::new(file);
    witness.serialize_into(writer).unwrap();

    debug_eval(&MyCircuit::default(), &assignment, EmptyHintCaller);
}
