import { useSubmit } from "@remix-run/react"
import { BsApple } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook2 } from "react-icons/im"
import { signInWithGooglePopup } from "~/utils/firebase.utils"

export const SocialForm = () => {
    const submit = useSubmit()

    const FireBaseGoogLogin = async () => {
        const response = await signInWithGooglePopup()
        if (response) {
            let formData = new FormData();
            const userData = { ...response.user, firebaseUID: response.user.uid }
            formData.append("user", JSON.stringify(userData));

            submit(formData, { method: "post", action: "/auth?type=google" });

        }
    };

  return (
      <div>
          <p className='text-xs p-2 text-center'> or login via</p>
          <div className='flex justify-center'>
              <button className='m-4 rounded' id="google" onClick={FireBaseGoogLogin}>
                  <FcGoogle size="1.5em" />
              </button>
              <button className=' m-4 rounded  '>
                  {/* facebook icon from react-icons */}
                  <ImFacebook2 size="1.5em" />
              </button>

              {/* apple: showing apple icon */}
              <button className=' m-4 rounded '>
                  <BsApple size="1.5em" />
              </button>
          </div>

      </div>
  )
}
