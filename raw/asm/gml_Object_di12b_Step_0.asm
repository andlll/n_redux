// gml_Object_di12b_Step_0  locals=2 args=0 len=496
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2117DBC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2117DBC
00000040: b 0x2117DC4
00000044: popenv 0x4117D80
00000048: b 0x2117DC8
0000004C: popenv 0x1D17DC4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2117EA0
00000060: push.imm.e 156
00000064: pushenv 0x2117E1C
00000068: push.imm.e 4
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x2117E1C
000000A0: b 0x2117E24
000000A4: popenv 0x4117DE0
000000A8: b 0x2117E28
000000AC: popenv 0x1D17E24
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2117EA0
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x2117EA0
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 982
0000010C: conv.i.v
00000110: call action_sprite_set(argc=3)
00000118: popz
0000011C: push.imm.e 1
00000120: pop.v.i trans
00000128: push.imm.e 455
0000012C: pushenv 0x2117EE4
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: push.v night
00000148: call action_if_variable(argc=3)
00000150: pop.v.v local.__b__
00000158: push.local.v local.__b__
00000160: conv.v.b
00000164: bf 0x2117EE4
00000168: b 0x2117EEC
0000016C: popenv 0x4117EA8
00000170: b 0x2117EF0
00000174: popenv 0x1D17EEC
00000178: push.local.v local.__b__
00000180: conv.v.b
00000184: bf 0x2117F68
00000188: push.imm.e 0
0000018C: conv.i.v
00000190: push.imm.e 1
00000194: conv.i.v
00000198: push.v trans
000001A0: call action_if_variable(argc=3)
000001A8: pop.v.v local.__b__
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x2117F68
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: push.imm.e 654
000001D4: conv.i.v
000001D8: call action_sprite_set(argc=3)
000001E0: popz
000001E4: push.imm.e 0
000001E8: pop.v.i trans