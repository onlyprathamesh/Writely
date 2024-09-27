import React from 'react'
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
  } from "flowbite-react";
  import { BsApple, BsDiscord, BsDribbble, BsFacebook, BsGithub, BsInstagram, BsThreads, BsTwitter } from "react-icons/bs";
  
export default function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Writely"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">Writely</FooterLink>
                <FooterLink href="#">Our Services</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="contact us" />
              <FooterLinkGroup col>
                <span>+91 7564325689</span>
                <span>020 7523421568</span>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Writely™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsThreads} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsDiscord} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
