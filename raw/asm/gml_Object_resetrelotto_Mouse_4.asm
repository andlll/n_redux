// gml_Object_resetrelotto_Mouse_4  locals=2 args=0 len=184
// locals: arguments, __b__
00000000: push.imm.e 467
00000004: pushenv 0x20C2F3C
00000008: call action_kill_object(argc=0)
00000010: popz
00000014: popenv 0x40C2F30
00000018: push.imm.e 0
0000001C: conv.i.v
00000020: push.imm.e 0
00000024: conv.i.v
00000028: push.imm.e 736
0000002C: conv.i.v
00000030: call action_if_number(argc=3)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x20C2F90
00000050: push.s "nimsavbac"
00000058: conv.s.v
0000005C: call action_load_game(argc=1)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.imm.e 736
0000007C: conv.i.v
00000080: call action_if_number(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x20C2FE0
000000A0: push.s "nimsav_easbac"
000000A8: conv.s.v
000000AC: call action_load_game(argc=1)
000000B4: popz