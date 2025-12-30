// this function generates the message body for the email sent to new users

exports.message = (role, email, password, url) => {
  return `Dear sir/madam,

We are happy to inform you that you have been successfully added as an ${role} in our system.

You can now access the platform to manage  data, track activities, and collaborate with our team.

Your Login Details:
Email: ${email}
Password: ${password}

Login URL:
${url}

If you have any questions or need support, feel free to contact us.

Best Regards,
VM3 Team
`;
};
