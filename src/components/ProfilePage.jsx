import PersonalInfo from "./PersonalInfo";

export default function ProfilePage() {
  const user = {
    name: "Aniket Dobriyal",
    gender: "Male",
    email: "aniket@example.com",
    phone: "+91 9058894944",
    address: "123 Street, Dehradun, India",
  };

  return (
    <PersonalInfo
      userData={user}
      onSave={(updated) => alert("Profile updated: " + JSON.stringify(updated))}
    />
  );
}
