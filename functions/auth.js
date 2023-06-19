const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
    const { body } = event;
    const { code } = JSON.parse(body);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.auth.signIn({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
    });

    if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error),
            headers: {
                "Access-Control-Allow-Origin" : "*", // Allow any origin
                "Access-Control-Allow-Headers": "Content-Type"
            }
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }),        
        headers: {
            "Access-Control-Allow-Origin" : "*", // Allow any origin
            "Access-Control-Allow-Headers": "Content-Type"
        }
    };
};