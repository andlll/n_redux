// gml_Object_object8_Alarm_1  locals=2 args=0 len=312
// locals: arguments, __b__
00000000: push.imm.e 2
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 455
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x213BF64
00000038: push.imm.e 455
0000003C: pushenv 0x213BEA8
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 1
0000004C: conv.i.v
00000050: push.v dawn
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x213BEA8
00000078: b 0x213BEB0
0000007C: popenv 0x413BE6C
00000080: b 0x213BEB4
00000084: popenv 0x1D3BEB0
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x213BEE4
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.i 15201023
000000A8: conv.i.v
000000AC: call action_sprite_color(argc=2)
000000B4: popz
000000B8: push.imm.e 455
000000BC: pushenv 0x213BF28
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v night
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x213BF28
000000F8: b 0x213BF30
000000FC: popenv 0x413BEEC
00000100: b 0x213BF34
00000104: popenv 0x1D3BF30
00000108: push.local.v local.__b__
00000110: conv.v.b
00000114: bf 0x213BF64
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: push.i 16366009
00000128: conv.i.v
0000012C: call action_sprite_color(argc=2)
00000134: popz