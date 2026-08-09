// gml_Object_placeholder_Step_0  locals=2 args=0 len=568
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x21D9CB0
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21D9CB0
00000040: b 0x21D9CB8
00000044: popenv 0x41D9C74
00000048: b 0x21D9CBC
0000004C: popenv 0x1DD9CB8
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21D9D10
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 736
00000074: conv.i.v
00000078: call action_if_number(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x21D9D10
00000098: call action_kill_object(argc=0)
000000A0: popz
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.v making
000000BC: call action_if_variable(argc=3)
000000C4: pop.v.v local.__b__
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x21D9DA0
000000DC: push.imm.e 0
000000E0: conv.i.v
000000E4: push.imm.e 1
000000E8: conv.i.v
000000EC: push.v ult
000000F4: call action_if_variable(argc=3)
000000FC: pop.v.v local.__b__
00000104: push.local.v local.__b__
0000010C: conv.v.b
00000110: bf 0x21D9DA0
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.i 65280
00000124: conv.i.v
00000128: call action_sprite_color(argc=2)
00000130: popz
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 1
00000140: conv.i.v
00000144: push.v making
0000014C: call action_if_variable(argc=3)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x21D9E2C
0000016C: push.imm.e 0
00000170: conv.i.v
00000174: push.imm.e 0
00000178: conv.i.v
0000017C: push.v ult
00000184: call action_if_variable(argc=3)
0000018C: pop.v.v local.__b__
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x21D9E2C
000001A4: push.imm.e 1
000001A8: conv.i.v
000001AC: push.imm.e 255
000001B0: conv.i.v
000001B4: call action_sprite_color(argc=2)
000001BC: popz
000001C0: push.imm.e 156
000001C4: pushenv 0x21D9E70
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.imm.e 6
000001D4: conv.i.v
000001D8: push.v selec
000001E0: call action_if_variable(argc=3)
000001E8: pop.v.v local.__b__
000001F0: push.local.v local.__b__
000001F8: conv.v.b
000001FC: bf 0x21D9E70
00000200: b 0x21D9E78
00000204: popenv 0x41D9E34
00000208: b 0x21D9E7C
0000020C: popenv 0x1DD9E78
00000210: push.local.v local.__b__
00000218: conv.v.b
0000021C: bf 0x21D9EA4
00000220: push.imm.e 616
00000224: pushenv 0x21D9EA0
00000228: push.imm.e 0
0000022C: pop.v.i scrolling
00000234: popenv 0x41D9E94