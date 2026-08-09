// gml_Object_i21bb_Step_0  locals=2 args=0 len=400
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2118488
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2118488
00000040: b 0x2118490
00000044: popenv 0x411844C
00000048: b 0x2118494
0000004C: popenv 0x1D18490
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x211850C
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.v trans
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x211850C
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 25
000000A4: conv.i.v
000000A8: push.imm.e 993
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i trans
000000C8: push.imm.e 455
000000CC: pushenv 0x2118550
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.v night
000000E8: call action_if_variable(argc=3)
000000F0: pop.v.v local.__b__
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x2118550
00000108: b 0x2118558
0000010C: popenv 0x4118514
00000110: b 0x211855C
00000114: popenv 0x1D18558
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x21185D4
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 1
00000134: conv.i.v
00000138: push.v trans
00000140: call action_if_variable(argc=3)
00000148: pop.v.v local.__b__
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x21185D4
00000160: push.imm.e 1
00000164: conv.i.v
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 654
00000174: conv.i.v
00000178: call action_sprite_set(argc=3)
00000180: popz
00000184: push.imm.e 0
00000188: pop.v.i trans