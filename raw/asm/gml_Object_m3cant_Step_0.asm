// gml_Object_m3cant_Step_0  locals=2 args=0 len=1256
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v redder
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x213FC0C
0000004C: push.imm.e 455
00000050: pushenv 0x213FA50
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 1
00000060: conv.i.v
00000064: push.v night
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x213FA50
0000008C: b 0x213FA58
00000090: popenv 0x413FA14
00000094: b 0x213FA5C
00000098: popenv 0x1D3FA58
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x213FA8C
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.i 16366009
000000BC: conv.i.v
000000C0: call action_sprite_color(argc=2)
000000C8: popz
000000CC: push.imm.e 455
000000D0: pushenv 0x213FAD0
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 1
000000E0: conv.i.v
000000E4: push.v dawn
000000EC: call action_if_variable(argc=3)
000000F4: pop.v.v local.__b__
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x213FAD0
0000010C: b 0x213FAD8
00000110: popenv 0x413FA94
00000114: b 0x213FADC
00000118: popenv 0x1D3FAD8
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x213FB0C
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: push.i 15201023
0000013C: conv.i.v
00000140: call action_sprite_color(argc=2)
00000148: popz
0000014C: push.imm.e 455
00000150: pushenv 0x213FB50
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: push.imm.e 0
00000160: conv.i.v
00000164: push.v dawn
0000016C: call action_if_variable(argc=3)
00000174: pop.v.v local.__b__
0000017C: push.local.v local.__b__
00000184: conv.v.b
00000188: bf 0x213FB50
0000018C: b 0x213FB58
00000190: popenv 0x413FB14
00000194: b 0x213FB5C
00000198: popenv 0x1D3FB58
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x213FBEC
000001AC: push.imm.e 455
000001B0: pushenv 0x213FBB0
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.v night
000001CC: call action_if_variable(argc=3)
000001D4: pop.v.v local.__b__
000001DC: push.local.v local.__b__
000001E4: conv.v.b
000001E8: bf 0x213FBB0
000001EC: b 0x213FBB8
000001F0: popenv 0x413FB74
000001F4: b 0x213FBBC
000001F8: popenv 0x1D3FBB8
000001FC: push.local.v local.__b__
00000204: conv.v.b
00000208: bf 0x213FBEC
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: push.i 16777215
0000021C: conv.i.v
00000220: call action_sprite_color(argc=2)
00000228: popz
0000022C: push.v y
00000234: neg.v.d
00000238: push.imm.e 1
0000023C: add.i.v
00000240: pop.v.v depth
00000248: b 0x213FC30
0000024C: push.d 0.4
00000258: conv.d.v
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: call action_sprite_color(argc=2)
0000026C: popz
00000270: push.imm.e 1
00000274: conv.i.v
00000278: push.imm.e 14
0000027C: conv.i.v
00000280: push.v phase
00000288: call action_if_variable(argc=3)
00000290: pop.v.v local.__b__
00000298: push.local.v local.__b__
000002A0: conv.v.b
000002A4: bf 0x213FD10
000002A8: push.imm.e 125
000002AC: pushenv 0x213FCAC
000002B0: push.imm.e 0
000002B4: conv.i.v
000002B8: push.imm.e 1
000002BC: conv.i.v
000002C0: push.v play
000002C8: call action_if_variable(argc=3)
000002D0: pop.v.v local.__b__
000002D8: push.local.v local.__b__
000002E0: conv.v.b
000002E4: bf 0x213FCAC
000002E8: b 0x213FCB4
000002EC: popenv 0x413FC70
000002F0: b 0x213FCB8
000002F4: popenv 0x1D3FCB4
000002F8: push.local.v local.__b__
00000300: conv.v.b
00000304: bf 0x213FD10
00000308: push.imm.e 156
0000030C: pushenv 0x213FCE8
00000310: push.v ele
00000318: push.imm.e -5
0000031C: add.i.v
00000320: pop.v.v ele
00000328: popenv 0x413FCD0
0000032C: push.imm.e 156
00000330: pushenv 0x213FD0C
00000334: push.v mon
0000033C: push.imm.e -5
00000340: add.i.v
00000344: pop.v.v mon
0000034C: popenv 0x413FCF4
00000350: push.imm.e 4
00000354: conv.i.v
00000358: push.imm.e 14
0000035C: conv.i.v
00000360: push.v phase
00000368: call action_if_variable(argc=3)
00000370: pop.v.v local.__b__
00000378: push.local.v local.__b__
00000380: conv.v.b
00000384: bf 0x213FE94
00000388: push.imm.e 156
0000038C: pushenv 0x213FD8C
00000390: push.imm.e 0
00000394: conv.i.v
00000398: push.imm.e 1
0000039C: conv.i.v
000003A0: push.v spy
000003A8: call action_if_variable(argc=3)
000003B0: pop.v.v local.__b__
000003B8: push.local.v local.__b__
000003C0: conv.v.b
000003C4: bf 0x213FD8C
000003C8: b 0x213FD94
000003CC: popenv 0x413FD50
000003D0: b 0x213FD98
000003D4: popenv 0x1D3FD94
000003D8: push.local.v local.__b__
000003E0: conv.v.b
000003E4: bf 0x213FDE8
000003E8: push.imm.e 156
000003EC: pushenv 0x213FDE4
000003F0: push.imm.e 0
000003F4: conv.i.v
000003F8: call action_set_relative(argc=1)
00000400: popz
00000404: push.imm.e 0
00000408: pop.v.i spy
00000410: push.imm.e 1
00000414: conv.i.v
00000418: call action_set_relative(argc=1)
00000420: popz
00000424: popenv 0x413FDB0
00000428: push.imm.e 455
0000042C: pushenv 0x213FE2C
00000430: push.imm.e 0
00000434: conv.i.v
00000438: push.imm.e 1
0000043C: conv.i.v
00000440: push.v night
00000448: call action_if_variable(argc=3)
00000450: pop.v.v local.__b__
00000458: push.local.v local.__b__
00000460: conv.v.b
00000464: bf 0x213FE2C
00000468: b 0x213FE34
0000046C: popenv 0x413FDF0
00000470: b 0x213FE38
00000474: popenv 0x1D3FE34
00000478: push.local.v local.__b__
00000480: conv.v.b
00000484: bf 0x213FE70
00000488: push.imm.e 156
0000048C: pushenv 0x213FE68
00000490: push.v ele
00000498: push.imm.e -2
0000049C: add.i.v
000004A0: pop.v.v ele
000004A8: popenv 0x413FE50
000004AC: b 0x213FE94
000004B0: push.imm.e 156
000004B4: pushenv 0x213FE90
000004B8: push.v ele
000004C0: push.imm.e -1
000004C4: add.i.v
000004C8: pop.v.v ele
000004D0: popenv 0x413FE78
000004D4: push.imm.e 0
000004D8: conv.i.v
000004DC: call action_set_relative(argc=1)
000004E4: popz