package com.unisync.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

// Custom light colors mapped exactly from the tailwind tokens
val Primary = Color(0xFF0058BE)
val PrimaryContainer = Color(0xFF2170E4)
val Secondary = Color(0xFF006C49)
val SecondaryContainer = Color(0xFF6CF8BB)
val Tertiary = Color(0xFF6B38D4)
val TertiaryContainer = Color(0xFF8455EF)
val SurfaceBg = Color(0xFFF6FAFE)
val OnSurface = Color(0xFF171C1F)
val OnSurfaceVariant = Color(0xFF424754)
val OutlineVariant = Color(0xFFC2C6D6)
val Error = Color(0xFFBA1A1A)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    primaryContainer = PrimaryContainer,
    secondary = Secondary,
    secondaryContainer = SecondaryContainer,
    tertiary = Tertiary,
    background = SurfaceBg,
    surface = SurfaceBg,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = OnSurface,
    onSurface = OnSurface,
    onSurfaceVariant = OnSurfaceVariant,
    error = Error
)

@Composable
fun UniSyncTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = AppTypography,
        content = content
    )
}

/**
 * Reusable Jetpack Compose Modifier to apply high-fidelity Neumorphic Raised shadows
 */
fun Modifier.neumorphicRaised(
    borderRadius: Dp = 16.dp,
    elevation: Dp = 6.dp,
    lightShadowColor: Color = Color.White.copy(alpha = 0.95f),
    darkShadowColor: Color = Color(0xA3B1C6).copy(alpha = 0.55f)
): Modifier = this.drawBehind {
    val radiusPx = borderRadius.toPx()
    val elevationPx = elevation.toPx()
    
    drawIntoCanvas { canvas ->
        // 1. Draw Top-Left Light Glow
        val paintLight = Paint().apply {
            color = lightShadowColor
            asFrameworkPaint().apply {
                setShadowLayer(
                    elevationPx,
                    -elevationPx,
                    -elevationPx,
                    lightShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintLight
        )

        // 2. Draw Bottom-Right Soft Dark Shadow
        val paintDark = Paint().apply {
            color = SurfaceBg
            asFrameworkPaint().apply {
                setShadowLayer(
                    elevationPx + 2f,
                    elevationPx,
                    elevationPx,
                    darkShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintDark
        )
    }
}

/**
 * Reusable Jetpack Compose Modifier to apply Neumorphic Sunken/Inset shadows
 */
fun Modifier.neumorphicSunken(
    borderRadius: Dp = 16.dp,
    depth: Dp = 4.dp,
    lightShadowColor: Color = Color.White,
    darkShadowColor: Color = Color(0xA3B1C6).copy(alpha = 0.5f)
): Modifier = this.drawBehind {
    val radiusPx = borderRadius.toPx()
    val depthPx = depth.toPx()

    drawIntoCanvas { canvas ->
        // In Jetpack Compose, true Inset Shadow is typically drawn with clipping path
        // and nested drawing. This represents a highly optimized drawing implementation.
        val paint = Paint().apply {
            color = SurfaceBg
            asFrameworkPaint().apply {
                isAntiAlias = true
            }
        }
        
        // Background Base
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paint
        )

        // Nested Inner Shadow Simulation
        val paintShadow = Paint().apply {
            color = Color.Transparent
            asFrameworkPaint().apply {
                isAntiAlias = true
                strokeWidth = depthPx
                setStyle(android.graphics.Paint.Style.STROKE)
                setShadowLayer(
                    depthPx,
                    depthPx,
                    depthPx,
                    darkShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = -depthPx,
            top = -depthPx,
            right = size.width + depthPx,
            bottom = size.height + depthPx,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintShadow
        )
    }
}