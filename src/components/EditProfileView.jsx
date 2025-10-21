import React, { useState, useEffect } from "react";

export default function EditProfileView({ formData, setFormData, onSave, fileRef }) {
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setFormData((d) => ({ ...d, avatar: f }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    onSave(formData);
  };

  const getAvatar = () => {
    const initials = formData.name.split(" ").map((s) => s[0]).slice(0, 2).join("");
    const avatarSrc = preview || (formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : formData.avatar);
    return (
      <div className="avatar-lg">
        {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <div className="initial">{initials}</div>}
      </div>
    );
  };

  return (
    <form className="edit-form content-area" onSubmit={handleSubmit}>
      <h1 className="main-title">Edit Profile</h1>
      <p className="subtitle">Update your personal and contact information.</p>

      <div className="avatar-section">
        {getAvatar()}
        <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleFile} />
        <div className="avatar-actions">
          <button type="button" className="btn primary" onClick={() => fileRef.current?.click()}>Upload New</button>
          <button type="button" className="btn ghost" onClick={() => { setPreview(null); setFormData({ ...formData, avatar: null }); if(fileRef.current) fileRef.current.value=''; }}>Remove</button>
        </div>
      </div>

      <div className="field-group">
        <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" required/>
        <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required/>
        <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone"/>
      </div>

      <div className="field-group two-col">
        <input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="City"/>
        <input value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} placeholder="State"/>
        <input value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="Country"/>
        <input value={formData.postal} onChange={e => setFormData({ ...formData, postal: e.target.value })} placeholder="Postal Code"/>
      </div>

      <button type="submit" className="btn primary full-width save-btn">{saving ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
