import { useRouteError } from 'react-router-dom';

import BroadcastError from '@assets/images/unhappy-face-ui.png';
import { SharedComponentsSelectors } from '@tests/selectors/shared-component.selectors';
import { Box, Flex, Stack, styled } from 'leather-styles/jsx';

import { Prism } from '@app/common/clarity-prism';
import { HasChildren } from '@app/common/has-children';
import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { Header } from '@app/components/header';
import { ErrorBoundary, FallbackProps, useErrorHandler } from '@app/features/errors/error-boundary';
import { openGithubIssue } from '@app/features/errors/utils';
import { useErrorStackTraceState } from '@app/store/ui/ui.hooks';
import { Button } from '@app/ui/components/button/button';
import { CodeBlock } from '@app/ui/components/codeblock';
import { Title } from '@app/ui/components/typography/title';

export function RouterErrorBoundary() {
  const error = useRouteError() as Error;

  const title = 'Something went wrong';
  const body = 'An error occurred in the app.';
  const errorPayload = error.message;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={['space.05', 'unset']}
      width="100%"
      height="100vh"
    >
      <Box mt="space.05">
        <img src={BroadcastError} alt="Unhappy user interface cloud" width="106px" />
      </Box>
      <styled.span
        data-testid={SharedComponentsSelectors.BroadcastErrorTitle}
        mx="space.05"
        mt="space.05"
        textStyle="heading.05"
      >
        {title}
      </styled.span>
      <styled.span color="ink.text-subdued" mt="space.04" textAlign="center" textStyle="body.02">
        {body}
      </styled.span>

      {errorPayload && (
        <Box
          bg="ink.component-background-default"
          borderRadius="sm"
          my="space.05"
          mx="space.05"
          p="space.04"
          textAlign="left"
          textStyle="mono.02"
          wordBreak="break-all"
        >
          {errorPayload}
        </Box>
      )}

      <Stack gap="space.04">
        <Button onClick={() => window.location.reload()} type="button">
          Reload extension
        </Button>
        <Button
          onClick={() =>
            openGithubIssue({ message: error.message, stackTrace: JSON.stringify(error) })
          }
          type="button"
        >
          Report issue on GitHub
        </Button>
      </Stack>
    </Flex>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [value] = useErrorStackTraceState();

  useRouteHeader(<Header />);

  return (
    <Stack gap="space.06" flexGrow={1}>
      <Title>Something went wrong</Title>
      <Box className="error-codeblock" maxWidth="100vw" overflow="hidden">
        {value && (
          <CodeBlock
            border="default"
            code={value}
            flexShrink={1}
            overflow="auto"
            language="bash"
            maxHeight="305px"
            maxWidth="100%"
            prism={Prism as any}
            width="100%"
          />
        )}
      </Box>
      <Stack mt="auto" gap="space.04">
        <styled.button onClick={resetErrorBoundary} type="button">
          Reload extension
        </styled.button>
        <styled.button
          onClick={() => openGithubIssue({ message: error.message, stackTrace: value })}
          type="button"
        >
          Report issue on GitHub
        </styled.button>
      </Stack>
    </Stack>
  );
}

export function AppErrorBoundary({ children }: HasChildren) {
  const handleOnError = useErrorHandler();
  return (
    <ErrorBoundary
      onReset={() => window.location.reload()}
      FallbackComponent={ErrorFallback}
      onError={handleOnError}
    >
      {children}
    </ErrorBoundary>
  );
}
