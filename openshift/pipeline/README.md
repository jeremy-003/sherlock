This directory contains a Jenkinsfile which can be used to build
nodejs-ex using an OpenShift build pipeline.

To do this, run:

```bash
# create silly as usual
oc new-app https://github.com/jeremy-003/sherlock

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/jeremy-003/ssherlock \
  --context-dir=openshift/pipeline --name nodejs-ex-pipeline
```
