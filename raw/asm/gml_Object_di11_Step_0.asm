// gml_Object_di11_Step_0  locals=2 args=0 len=456
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2116DAC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2116DAC
00000040: b 0x2116DB4
00000044: popenv 0x4116D70
00000048: b 0x2116DB8
0000004C: popenv 0x1D16DB4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2116E4C
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.v trans
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x2116E4C
00000098: push.imm.e -1
0000009C: conv.i.v
000000A0: push.imm.e 58
000000A4: conv.i.v
000000A8: push.imm.e 977
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: push.imm.e 0
000000C0: conv.i.v
000000C4: push.imm.e 45
000000C8: conv.i.v
000000CC: call action_set_alarm(argc=2)
000000D4: popz
000000D8: push.imm.e 1
000000DC: pop.v.i trans
000000E4: push.imm.e 455
000000E8: pushenv 0x2116E90
000000EC: push.imm.e 0
000000F0: conv.i.v
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.v night
00000104: call action_if_variable(argc=3)
0000010C: pop.v.v local.__b__
00000114: push.local.v local.__b__
0000011C: conv.v.b
00000120: bf 0x2116E90
00000124: b 0x2116E98
00000128: popenv 0x4116E54
0000012C: b 0x2116E9C
00000130: popenv 0x1D16E98
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x2116F30
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: push.v trans
0000015C: call action_if_variable(argc=3)
00000164: pop.v.v local.__b__
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x2116F30
0000017C: push.imm.e 1
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 977
00000190: conv.i.v
00000194: call action_sprite_set(argc=3)
0000019C: popz
000001A0: push.imm.e 1
000001A4: conv.i.v
000001A8: push.imm.e 45
000001AC: conv.i.v
000001B0: call action_set_alarm(argc=2)
000001B8: popz
000001BC: push.imm.e 0
000001C0: pop.v.i trans