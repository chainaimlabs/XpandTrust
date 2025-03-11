module oracle_example::boolean_data_oracle {
    use std::signer;


    /// Stores the boolean data
    struct BooleanData has key {
        value: bool,
        last_updated: u64,
    }

    /// Event emitted when new boolean data is updated
    struct BooleanDataUpdateEvent has drop, store {
        new_value: bool,
        update_time: u64,
    }

    /// Initialize the data storage
    public entry fun initialize(account: &signer) {
        move_to(account, BooleanData { value: false, last_updated: 0 });
    }

    /// Update the boolean data (only callable by an authorized oracle)
    public entry fun update_boolean_data(oracle: &signer, new_value: bool) acquires BooleanData {
        // In production, ensure `oracle` is an authorized address
        let boolean_data = borrow_global_mut<BooleanData>(signer::address_of(oracle));
        boolean_data.value = new_value;
        boolean_data.last_updated = aptos_framework::timestamp::now_seconds();

        // Emit an event for off-chain tracking
        /*
        event::emit(BooleanDataUpdateEvent {
            new_value,
            update_time: boolean_data.last_updated,
        });
        */
    }


    #[view]
    public fun get_boolean_data(addr: address): bool acquires BooleanData {
        borrow_global<BooleanData>(addr).value
    }
}

