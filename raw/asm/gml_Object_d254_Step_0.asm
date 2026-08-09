// gml_Object_d254_Step_0  locals=2 args=0 len=820
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x21201A4
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21201A4
00000040: b 0x21201AC
00000044: popenv 0x4120168
00000048: b 0x21201B0
0000004C: popenv 0x1D201AC
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2120288
00000060: push.imm.e 156
00000064: pushenv 0x2120204
00000068: push.imm.e 3
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x2120204
000000A0: b 0x212020C
000000A4: popenv 0x41201C8
000000A8: b 0x2120210
000000AC: popenv 0x1D2020C
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2120288
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x2120288
000000F8: push.imm.e 1
000000FC: pop.v.i bout
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 518
00000118: conv.i.v
0000011C: call action_sprite_set(argc=3)
00000124: popz
00000128: push.imm.e 455
0000012C: pushenv 0x21202CC
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: push.v night
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x21202CC
00000168: b 0x21202D4
0000016C: popenv 0x4120290
00000170: b 0x21202D8
00000174: popenv 0x1D202D4
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x212036C
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 0
00000194: conv.i.v
00000198: push.v trans
000001A0: call action_if_variable(argc=3)
000001A8: pop.v.v local.__b__
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x212036C
000001C0: push.imm.e -1
000001C4: conv.i.v
000001C8: push.imm.e 87
000001CC: conv.i.v
000001D0: push.imm.e 794
000001D4: conv.i.v
000001D8: call action_sprite_set(argc=3)
000001E0: popz
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 88
000001F0: conv.i.v
000001F4: call action_set_alarm(argc=2)
000001FC: popz
00000200: push.imm.e 1
00000204: pop.v.i trans
0000020C: push.imm.e 455
00000210: pushenv 0x21203B0
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.v night
0000022C: call action_if_variable(argc=3)
00000234: pop.v.v local.__b__
0000023C: push.local.v local.__b__
00000244: conv.v.b
00000248: bf 0x21203B0
0000024C: b 0x21203B8
00000250: popenv 0x4120374
00000254: b 0x21203BC
00000258: popenv 0x1D203B8
0000025C: push.local.v local.__b__
00000264: conv.v.b
00000268: bf 0x2120494
0000026C: push.imm.e 0
00000270: conv.i.v
00000274: push.imm.e 1
00000278: conv.i.v
0000027C: push.v trans
00000284: call action_if_variable(argc=3)
0000028C: pop.v.v local.__b__
00000294: push.local.v local.__b__
0000029C: conv.v.b
000002A0: bf 0x2120494
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.v bout
000002BC: call action_if_variable(argc=3)
000002C4: pop.v.v local.__b__
000002CC: push.local.v local.__b__
000002D4: conv.v.b
000002D8: bf 0x2120460
000002DC: push.imm.e 1
000002E0: conv.i.v
000002E4: push.imm.e 0
000002E8: conv.i.v
000002EC: push.imm.e 794
000002F0: conv.i.v
000002F4: call action_sprite_set(argc=3)
000002FC: popz
00000300: push.imm.e 1
00000304: conv.i.v
00000308: push.imm.e 88
0000030C: conv.i.v
00000310: call action_set_alarm(argc=2)
00000318: popz
0000031C: push.imm.e 0
00000320: pop.v.i bout
00000328: push.imm.e 0
0000032C: pop.v.i trans