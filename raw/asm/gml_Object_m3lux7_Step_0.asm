// gml_Object_m3lux7_Step_0  locals=2 args=0 len=820
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x213E698
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x213E698
00000040: b 0x213E6A0
00000044: popenv 0x413E65C
00000048: b 0x213E6A4
0000004C: popenv 0x1D3E6A0
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x213E790
00000060: push.imm.e 156
00000064: pushenv 0x213E6F8
00000068: push.imm.e 4
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x213E6F8
000000A0: b 0x213E700
000000A4: popenv 0x413E6BC
000000A8: b 0x213E704
000000AC: popenv 0x1D3E700
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x213E790
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x213E790
000000F8: push.v image_alpha
00000100: push.imm.e 1
00000104: cmp.i.v <
00000108: bf 0x213E784
0000010C: push.v image_alpha
00000114: push.d 0.013
00000120: add.d.v
00000124: pop.v.v image_alpha
0000012C: b 0x213E790
00000130: push.imm.e 1
00000134: pop.v.i trans
0000013C: push.imm.e 455
00000140: pushenv 0x213E7D4
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: push.v night
0000015C: call action_if_variable(argc=3)
00000164: pop.v.v local.__b__
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x213E7D4
0000017C: b 0x213E7DC
00000180: popenv 0x413E798
00000184: b 0x213E7E0
00000188: popenv 0x1D3E7DC
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x213E8A0
0000019C: push.imm.e 156
000001A0: pushenv 0x213E834
000001A4: push.imm.e 3
000001A8: conv.i.v
000001AC: push.imm.e 0
000001B0: conv.i.v
000001B4: push.v ele
000001BC: call action_if_variable(argc=3)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x213E834
000001DC: b 0x213E83C
000001E0: popenv 0x413E7F8
000001E4: b 0x213E840
000001E8: popenv 0x1D3E83C
000001EC: push.local.v local.__b__
000001F4: conv.v.b
000001F8: bf 0x213E8A0
000001FC: push.imm.e 0
00000200: conv.i.v
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: push.v trans
00000214: call action_if_variable(argc=3)
0000021C: pop.v.v local.__b__
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x213E8A0
00000234: push.imm.e 0
00000238: pop.v.i image_alpha
00000240: push.imm.e 1
00000244: pop.v.i bout
0000024C: push.imm.e 455
00000250: pushenv 0x213E8E4
00000254: push.imm.e 0
00000258: conv.i.v
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: push.v night
0000026C: call action_if_variable(argc=3)
00000274: pop.v.v local.__b__
0000027C: push.local.v local.__b__
00000284: conv.v.b
00000288: bf 0x213E8E4
0000028C: b 0x213E8EC
00000290: popenv 0x413E8A8
00000294: b 0x213E8F0
00000298: popenv 0x1D3E8EC
0000029C: push.local.v local.__b__
000002A4: conv.v.b
000002A8: bf 0x213E988
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.imm.e 1
000002B8: conv.i.v
000002BC: push.v trans
000002C4: call action_if_variable(argc=3)
000002CC: pop.v.v local.__b__
000002D4: push.local.v local.__b__
000002DC: conv.v.b
000002E0: bf 0x213E988
000002E4: push.v image_alpha
000002EC: push.imm.e 0
000002F0: cmp.i.v >
000002F4: bf 0x213E97C
000002F8: push.v image_alpha
00000300: push.d 0.013
0000030C: sub.d.v
00000310: pop.v.v image_alpha
00000318: push.imm.e 0
0000031C: pop.v.i bout
00000324: b 0x213E988
00000328: push.imm.e 0
0000032C: pop.v.i trans