This directory contains a Jenkinsfile which can be used to build
sherlock using an OpenShift build pipeline.

To do this, run:

```bash
# create sherlock as usual
oc new-app https://github.com/jeremy-003/sherlock

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/jeremy-003/sherlock \
  --context-dir=openshift/pipeline --name sherlock
```
