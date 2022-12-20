import stepList from './steps'
import styles from './how-it-works.module.scss';
import Image from "next/image";

const HowItWorks = () => {
    let steps = stepList;
    return (
        <div className={styles.hiwContainer}>
            <div className={styles.hiwHeader}>
                <h2>How it works</h2>
            </div>
            <div className={styles.hiwSteps}>
                {steps.map(step => (
                    <div className={styles.hiwStep} key={step.id}>
                        <div className={styles.hiwStepImg}>
                            <Image
                            src={step.img.src}
                            alt="img"
                            height={50}
                            width={50}
                            />
                        </div>
                        <div className={styles.hiwStepText}>
                            <div className={styles.hiwStepHeader}>
                                <p>{step.header}</p>
                            </div>
                            <div className={styles.hiwStepDesc}>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HowItWorks;