import {useRouter} from 'next/router';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {apiAxiosAll} from "../../src/utils/api";
import {DEFAULT_ENDPOINT} from "../../src/utils/constants/endpoints";
import toast from 'react-hot-toast';
import {getHeaderFooterData} from "../../src/utils/layout";
import Layout from "../../src/components/layout";

export default Login;

function Login( { headerFooter }) {
  const router = useRouter();
  const seo = {
    title: 'Login Page',
    description: 'Login Page',
    og_image: [],
    og_site_name: 'Login',
    robots: {
      index: 'index',
      follow: 'follow',
    },
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = {resolver: yupResolver(validationSchema)};

  // get functions to build form with useForm() hook
  const {register, handleSubmit, formState} = useForm(formOptions);
  const {errors} = formState;
  const onSubmit = async (values) => {
    try {
      const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/authenticate`, values, 'POST');
      //console.log('login-1--:', res);
      //console.log('post-status--:',res.data.status);
      if (200 === res?.status) {
        if(res.data.status == 1){
          console.log(res.data.message);
          toast.success(res.data.message);

          localStorage.setItem('race_user', JSON.stringify(res.data));
          router.push('/account/dashboard');
          /*const returnUrl = router.query.returnUrl || '/';
          router.push(returnUrl);*/
        } else {
          console.log(res.data.message);
          toast.error(res.data.message);
        }
        /*console.log('post-2--', res.data.name);*/
        //return res.data;
      } else {
        //console.log('post-3--');

      }
    } catch (e) {
      console.log(e);
    }
    /*alertService.clear();
    return userService.login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch(alertService.error);*/
  }

  return (
    <Layout headerFooter={ headerFooter || {} } seo={ seo }>
    <div className="card">
      <h4 className="card-header">Login</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="text" {...register('email')}
                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" {...register('password')}
                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
            Login
          </button>
          <Link href="/account/register" className="btn btn-link">Register</Link>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export async function getStaticProps() {

  const dataLayout = await getHeaderFooterData();

  return {
    props: {
      headerFooter: dataLayout?.data ?? {},

    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}
