export interface Wallet {
        id: string,
        currency: string,
        balance: string,
        locked: string,
        staked: string,
        user?: {
            id: string,
            sn: string,
            email: string,
            reference: string,
            first_name: string,
            last_name: string,
            display_name: string,
            created_at: string,
            updated_at: string,
        },
        converted_balance: string,
        reference_currency: string,
        is_crypto: true,
        created_at: string,
        updated_at: string,
        deposit_address: string,
        destination_tag: string
}


export interface IAddress {
    id: string;
    reference: string;
    currency: string;
    address: string;
    network: string;
    user?: {
      id: string;
      sn: string;
      email: string;
      reference: string;
      first_name: string;
      last_name: string;
      display_name: string;
      created_at: string;
      updated_at: string;
    };
    destination_tag: string;
    total_payments: string;
    created_at: string;
    updated_at: string;
  }