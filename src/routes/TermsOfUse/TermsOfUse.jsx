import React, { useEffect } from 'react'
import './TermsOfUse.scss'
import Back from '../../components/Back/Back'

function TermsOfUse() {
  useEffect(() => {
    console.log('Effect is running!')
    document.title = 'Explore our user agreement - Ho-Ho! 🎅🏻'
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="termsOfUseContainer">
      <Back />
      <h1>Terms of Use</h1>
      <ul>
        <li>
          <strong>Acceptance of Terms</strong>
          <br />
          <p>
            By accessing this website, you agree to be bound by these Terms of
            Use and all applicable laws and regulations. If you do not agree to
            these terms, please do not use this site.
          </p>
        </li>
        <li>
          <strong>Use of the Site</strong>
          <br />
          <p>
            You are authorized to access our website for personal and
            non-commercial use. You agree not to use the site for any illegal or
            prohibited purposes under these terms.
          </p>
        </li>
        <li>
          <strong>Intellectual Property</strong>
          <br />
          <p>
            The content of the site, including but not limited to text,
            graphics, logos, images, audio and video clips, is the exclusive
            property of Ho-Ho! and is protected by intellectual property laws.
          </p>
        </li>
        <li>
          <strong>User Content</strong>
          <br />
          <p>
            By submitting content to the site, you grant Ho-Ho! a non-exclusive,
            worldwide, irrevocable, transferable, and royalty-free license to
            use, reproduce, distribute, and display this content.
          </p>
        </li>
        <li>
          <strong>Limitation of Liability</strong>
          <br />
          <p>
            Ho-Ho! does not guarantee the accuracy, completeness, or relevance
            of the site's content. The use of the site is at your own risk.
          </p>
        </li>
        <li>
          <strong>Modification of Terms</strong>
          <br />
          <p>
            Ho-Ho! reserves the right to modify these Terms of Use at any time.
            It is your responsibility to periodically check for changes.
          </p>
        </li>
      </ul>
    </div>
  )
}

export default TermsOfUse
